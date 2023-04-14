import { fetch } from "cross-fetch";
import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";
import prettier from "prettier";
import { Err, Ok, Result } from "ts-results";
import { v4 } from "uuid";
import type {
	CustomReference,
	PubmedReference,
	Reference,
	UrlReference,
} from "./references.types";
import { PubmedRefSchema, ReferenceCacheSchema } from "./references.types";
import * as YAML from "yaml";
import slugify from "slugify";

interface Args {
	reference_section_query_selector: string;
	references_container_query_selector: string;
	cache_directory: string;
	directory_root: string;
}

const args: Args = {
	reference_section_query_selector:
		'section[id][data-reference-section="true"]',
	references_container_query_selector: '*[class*="references"] ol.list',
	cache_directory:
		"C:\\Users\\hector.c\\Desktop\\projects\\OTS110_WebApp\\ref-scripts\\src\\cache.yaml",
	directory_root:
		"C:\\Users\\hector.c\\Desktop\\projects\\OTS110_WebApp\\src\\content\\schizo\\treatment\\new-content",
};

const PUBMED_API_KEY = "9f67c32c2d6d35609029c918034740901d07";

// Regex:
const URL_REF_REGEX = new RegExp(
	/{%URL_REF:https?:\/\/(www\.)?[-[\u00C0-\u017Fa-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=\[\]]*)%}/gi,
);
const PMID_REF_REGEX = new RegExp(/{%PUBMED_REF:([0-9]{7,8})%}/g);
const CUSTOM_REF_REGEX = new RegExp(/{%CUSTOM_REF:(.*)%}/g);
const SLUGIFY_REMOVAL_REGEX = /[*+~.()'"!:@\/]/g;

const matchReference =
	<T>(
		onPmidRef: (r: PubmedReference) => T,
		onCustomRef: (r: CustomReference) => T,
		onUrlRef: (r: UrlReference) => T,
	) =>
	(ref: Reference): T => {
		switch (ref.kind) {
			case "custom":
				return onCustomRef(ref);
			case "pubmed":
				return onPmidRef(ref);
			case "url":
				return onUrlRef(ref);
		}
	};

function pmidHtmlTemplate(data: PubmedReference, sectionTag: string): string {
	const generateAuthorsStr = (authors: PubmedReference["author"]) => {
		const authorStr = (author: PubmedReference["author"][number]) => {
			return /*html*/ `<span>${
				author?.family ? /*html*/ `<span>${author.family}</span>` : ""
			}${
				author?.given
					? /*html*/ ` <span>${author.given
							.trim()
							.charAt(0)
							.toUpperCase()}</span>`
					: ""
			}</span>`;
		};
		switch (authors.length) {
			case 0:
				return "";
			case 1:
				return `${authorStr(authors[0])}.`;
			case 2:
				return `${authorStr(authors[0])}, ${authorStr(authors[1])}.`;
			default:
				return `${authorStr(authors[0])}, ${authorStr(authors[1])}, et al.`;
		}
	};

	return /*html*/ `
      <div id="fn:${sectionTag}-${data.PMID}" class="footnote" aria-describedby="footnote">
        <span>
            ${generateAuthorsStr(data.author)}
        </span>
        <span><a href="https://pubmed.ncbi.nlm.nih.gov/${
					data.PMID
				}" target="_blank" rel="noopener">${data.title}</a>. </span>
        <span><em>${data["container-title-short"]}</em>. ${
		data.issued["date-parts"][0][0]
	};${data.volume ? data.volume : ""}${data.page ? `:${data.page}` : ""}</span>.
      </div>
    `;
}
function UrlRefHtmlTemplate(data: UrlReference, sectionTag: string): string {
	const generateAuthorsStr = (authors: UrlReference["authors"]) => {
		const authorStr = (author: string) => {
			return /*html*/ `<span>${author}</span>`;
		};
		if (authors == undefined) {
			return "";
		} else {
			switch (authors.length) {
				case 0:
					return "";
				case 1:
					return `${authorStr(authors[0])}.`;
				case 2:
					return `${authorStr(authors[0])}, ${authorStr(authors[1])}.`;
				default:
					return `${authorStr(authors[0])}, ${authorStr(authors[1])}, et al.`;
			}
		}
	};

	return /*html*/ `
      <div id="fn:${sectionTag}-${slugify(data.url, {
		remove: SLUGIFY_REMOVAL_REGEX,
	})}" class="footnote" aria-describedby="footnote">
      <span>
      ${generateAuthorsStr(data.authors)}
      </span>
        <span>“<a href="${data.url}" target="_blank" rel="noopener">${
		data?.title ?? data.url
	}</a>”. </span>
        <span><em>${data?.journal ? `${data.journal}.` : ""}</em> ${
		data?.date ? `${data.date};` : ""
	} </span>
        <span>Retrieved from: ${data.url}. </span>
        <span>${data.accessed ? `Accessed on: ${data.accessed}` : ""}
      </div>
    `;
}
function customRefHtmlTemplate(
	data: CustomReference,
	sectionTag: string,
): string {
	const generateAuthorsStr = (authors: CustomReference["authors"]) => {
		const authorStr = (author: string) => {
			return /*html*/ `<span>${author}</span>`;
		};
		if (authors == undefined) {
			return "";
		} else {
			switch (authors.length) {
				case 0:
					return "";
				case 1:
					return `${authorStr(authors[0])}.`;
				case 2:
					return `${authorStr(authors[0])}, ${authorStr(authors[1])}.`;
				default:
					return `${authorStr(authors[0])}, ${authorStr(authors[1])}, et al.`;
			}
		}
	};

	return /*html*/ `
      <div id="fn:${sectionTag}-${data.hash}" class="footnote" aria-describedby="footnote">
      <span>
      ${generateAuthorsStr(data.authors)}
      </span>
        <span><em>${data?.title ? `${data.title}.` : ""}</em></span>
        <span><em>${data?.journal ? `${data.journal}.` : ""}</em> ${
		data?.date ? `${data.date};` : ""
	}</span>
        <span>${data.volume ? data.volume : ""}${
					data.pages ? ` :${data.pages}` : ""
				}</span>

      </div>
    `;
}

const buildRefStr = (sectionTag: string) =>
	matchReference(
		(pubmedRef) => pmidHtmlTemplate(pubmedRef, sectionTag),
		(customRef) => customRefHtmlTemplate(customRef, sectionTag),
		(urlRef) => UrlRefHtmlTemplate(urlRef, sectionTag),
	);

// We want to be able to losslessly covert between different referencing styles at will. For this we want a common representation of references, which we
// can normalize to

interface LosslessConversion<T1, T2> {
	transform: (from: T1) => T2;
	inverseTransform: (from: T2) => T1;
	roundtripEquality: () => boolean;
}
const normalizationTransform = (doc: Document) => {
	const anchors = Array.from(
		doc.querySelectorAll<HTMLAnchorElement>('a[aria-describedby="ref-marker"]'),
	);

	anchors.forEach((anchor) => {
		const pmid = anchor.getAttribute("data-pmid");
		const hash = anchor.getAttribute("data-hash");
		const url = anchor.getAttribute("data-url");

		const predicate = !!pmid || !!hash || !!url;

		if (predicate) {
			const template =
				pmid !== null
					? `{%PUBMED_REF:${pmid.trim()}%}`
					: hash !== null
					? `{%CUSTOM_REF:${hash.trim()}%}`
					: url !== null
					? `{%URL_REF:${url.trim()}%}`
					: "";
			anchor.insertAdjacentHTML("afterend", template);
			anchor.remove();
		}
	});
};

const insertRefAnchorsIntoHtmlString = (htmlStr: string) => {
	let str = htmlStr.replace(PMID_REF_REGEX, (match) => {
		const pmidRefId = match.replace("{%PUBMED_REF:", "").replace("%}", "");
		return /*html*/ `<a data-ref-kind="${"pubmed"}" data-pmid="${pmidRefId}" aria-describedby="ref-marker" data-referent-id="${pmidRefId}" data-ref-marker-id="${v4()}"></a>`;
	});

	str = str.replace(URL_REF_REGEX, (match) => {
		const urlRefId = match.replace("{%URL_REF:", "").replace("%}", "");
		return /*html*/ `<a data-ref-kind="${"url"}" data-referent-id="${slugify(urlRefId, { remove: SLUGIFY_REMOVAL_REGEX })}" data-url="${urlRefId}" data-ref-marker-id="${v4()}" aria-describedby="ref-marker" ></a>`;
	});

	str = str.replace(CUSTOM_REF_REGEX, (match) => {
		const customRefId = match.replace("{%CUSTOM_REF:", "").replace("%}", "");
		return /*html*/ `<a data-ref-kind="${"custom"}" data-hash="${customRefId}" data-referent-id="${customRefId}" data-ref-marker-id="${v4()}"  aria-describedby="ref-marker" ></a>`;
	});

	return str;
};

type UniqueRef = { kind: string; uuid: string };
const findUniqueRefs = (sectionEl: HTMLDivElement) => {
	let refs: UniqueRef[] = [];

	const referenceMarkers = Array.from(
		sectionEl.querySelectorAll("a[data-referent-id][data-ref-kind]"),
	);
	for (const referenceMarker of referenceMarkers) {
		const refKind = (referenceMarker as any).dataset?.refKind?.trim();
		const refUuid = (referenceMarker as any).dataset?.referentId?.trim();

		if (!refs.some((ref) => ref.uuid === refUuid)) {
			refs.push({ uuid: refUuid, kind: refKind });
		}
	}

	console.log(refs);
	return refs;
};

type RefNode = UniqueRef & {
	sibling: ChildNode | null;
	element: Node;
	number: number;
};
const insertRefNumbers = (sectionEl: HTMLDivElement, refs: UniqueRef[]) => {
	// add each reference tag to a list noting down its number and the text node it comes after
	const numberedRefs: RefNode[] = [];
	refs.forEach((ref, index) => {
		// There may be several reference anchors which have the same reference hash.
		// We collect all of these, and insert a shared reference number.
		Array.from(
			sectionEl.querySelectorAll(`a[data-referent-id="${ref.uuid}"]`),
		).forEach((el) => {
			let sibling = el.previousSibling;
			let foundSibling = false;
			while (!foundSibling && sibling !== null) {
				if (
					sibling.nodeName === "#text" ||
					(sibling as any).getAttribute("data-referent-id") !== undefined
				) {
					foundSibling = true;
					break;
				}
				sibling = sibling.previousSibling;
			}
			// if (!sibling) {
			//   console.error(`Something went wrong! Could not find sibling for ref ${ref.hash}`);
			// }
			numberedRefs.push({
				kind: el?.getAttribute("data-ref-kind") ?? "no-kind",
				sibling,
				element: el.cloneNode(),
				number: index + 1,
				uuid: el?.getAttribute("data-referent-id") ?? "no-data-ref-uuid",
			});
			// remove the element - it will be re-added after re-ordering the refs tags.
			el.remove();
		});
	});

	// group the ref tags based on the node they are meant to follow,
	// then re-order them based on the reference number,
	// and re-add them to the document flow
	const reducedRefs = numberedRefs.reduce(
		(accumulator: Record<string, RefNode[]>, current) => {
			const key = current?.sibling?.textContent
				? current?.sibling?.textContent
				: "siblingless";

			if (accumulator[key] === undefined) {
				accumulator[key] = [];
			}
			if (
				!accumulator[key].find(
					(e) => e.uuid === current.uuid && e.number === current.number,
				)
			)
				accumulator[key].push(current);
			return accumulator;
		},
		{},
	);

	Object.values(reducedRefs).forEach((group) => {
		group
			.sort((a, b) => b.number - a.number)
			.forEach(({ sibling, element, number }, index, array) => {
				const isLast = array.length - 1 - index === array.length - 1;
				element.textContent = `${number}${!isLast ? "," : ""}`;
				if (sibling) {
					sibling.after(element);
				}
			});
	});
};

const insertRefHrefs = (sectionEl: HTMLDivElement) => {
	const insertRefHrefs = Array.from(
		sectionEl.querySelectorAll("a[data-referent-id]"),
	);

	insertRefHrefs.forEach((a) => {
		const referentId = a.getAttribute("data-referent-id")!;
		a.setAttribute("href", `#fn:${sectionEl.id}-${referentId}`);
	});
};

const addReferencesToBottom = async (
	doc: Document,
	sectionEl: HTMLDivElement,
	refs: Array<UniqueRef>,
	cache: Map<string, Reference>,
): Promise<Map<string, Reference>> => {
	// remove the old references and append the new references
	const sectionId = sectionEl.id;
	const footnotesContainer = sectionEl.querySelector(
		args.references_container_query_selector,
	);

	if (footnotesContainer) {
		footnotesContainer.innerHTML = "";

		for await (const [idx, ref] of refs.entries()) {
			switch (ref.kind) {
				case "pubmed": {
					const pubmedRefLi = doc.createElement("li");
					pubmedRefLi.value = idx + 1;
					pubmedRefLi.innerHTML = /*html*/ `Reference currently <em>incomplete</em>`;

					const cachingPubmedFetch = async (ref: UniqueRef) => {
						if (cache.has(ref.uuid)) {
							return cache.get(ref.uuid);
						} else {
							const pubmedReferent = (await fetchPubmedRef(ref.uuid)).expect(
								`could not fetch from pubmed API with ref ${ref.uuid}`,
							);
							cache.set(ref.uuid, pubmedReferent);
							return pubmedReferent;
						}
					};

					const payload = await cachingPubmedFetch(ref);

					if (!!payload) {
						const pubmedRefStr = buildRefStr(sectionId)(payload);

						pubmedRefLi.innerHTML = pubmedRefStr;
					}
					footnotesContainer.append(pubmedRefLi);

					break;
				}

				case "url": {
					const urlLi = doc.createElement("li");
					urlLi.value = idx + 1;
					urlLi.innerHTML = /*html*/ `Reference currently <em>incomplete</em>`;

					const urlRef = cache.get(ref.uuid);
					/**@ts-ignore */
					if (!!urlRef) {
						const urlRefStr = buildRefStr(sectionId)(urlRef);
						urlLi.innerHTML = urlRefStr;
					}
					if (!urlRef) {
						console.log(`${ref.uuid}`);
					}

					footnotesContainer.append(urlLi);
					break;
				}
				case "custom": {
					const customLi = doc.createElement("li");
					customLi.value = idx + 1;
					customLi.innerHTML = /*html*/ `Reference currently <em>incomplete</em>`;

					const customRef = cache.get(ref.uuid);

					/**@ts-ignore */
					if (!customRef) {
						console.log(`${ref.uuid}`);
					}
					if (!!customRef) {
						const customRefStr = buildRefStr(sectionId)(customRef);
						customLi.innerHTML = customRefStr;
					}

					footnotesContainer.append(customLi);
					break;
				}
				default:
					break;
			}
		}
	}

	return cache;
};

async function fetchPubmedRef(
	pubmedId: string,
): Promise<Result<PubmedReference, string>> {
	try {
		const response = await fetch(
			`https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/?format=csl&contenttype=json&id=${pubmedId}&api_key=${PUBMED_API_KEY}`,
		);

		const data = await response.json();

		const result = PubmedRefSchema.parse(data);
		return Ok(result);
	} catch (error) {
		return Err(`${error}`);
	}
}

const addCitations = async (htmlStr: string, cache: Map<string, Reference>) => {
	const reffedHtml = insertRefAnchorsIntoHtmlString(htmlStr);

	// parse the html file into a dom
	const dom = new JSDOM(reffedHtml);
	const doc = dom.window.document;

	const sectionEls = Array.from(
		doc.querySelectorAll<HTMLDivElement>(args.reference_section_query_selector),
	);

	for await (const sectionEl of sectionEls) {
		const uniqueRefs = findUniqueRefs(sectionEl);
		await addReferencesToBottom(doc, sectionEl, uniqueRefs, cache);
		insertRefNumbers(sectionEl, uniqueRefs);
		// remove empty <em> tags (seems to be an artefact introduced by jsdom)
		insertRefHrefs(sectionEl);
		doc.querySelectorAll("em").forEach((em) => {
			if (!em?.textContent?.trim().length) {
				em.remove();
			}
		});
	}

	// get the output as a string, exclude the <html> and <body> tags
	const updatedHtml = Array.from(doc.querySelectorAll("body > *"))
		.map((element) => element.outerHTML)
		.join("\n");

	return updatedHtml;
};

async function* walk(dir: string): AsyncGenerator<string> {
	for await (const d of await fs.promises.opendir(dir)) {
		const entry = path.join(dir, d.name);
		if (d.isDirectory()) yield* walk(entry);
		else if (d.isFile()) yield entry;
	}
}

// Then, use it with a simple async for loop
async function generateRefs() {
	const rootDirectoryPath = args.directory_root; // HTML file passed as the script argument
	const cacheDirectoryPath = args.cache_directory;

	const map = new Map(
		Object.entries(YAML.parse(fs.readFileSync(cacheDirectoryPath, "utf8"))),
	);

	const cache: Map<string, Reference> = ReferenceCacheSchema.parse(map);

	for await (const p of walk(rootDirectoryPath)) {
		const htmlFilePath = new RegExp(/.html/g);

		if (htmlFilePath.test(path.extname(p))) {
			const html = fs.readFileSync(p, "utf8");

			// parse the html file into a dom
			const dom = new JSDOM(html);
			const doc = dom.window.document;
			normalizationTransform(doc);
			const normalizedHtml = doc.documentElement.innerHTML;

			const updatedHtml = await addCitations(normalizedHtml, cache);

			// try and run the output through prettier, then save to disk overwriting the original file
			try {
				prettier.resolveConfig(p).then((options) => {
					fs.writeFileSync(
						p,
						prettier.format(updatedHtml, { parser: "html", ...options }),
					);
				});
			} catch (error) {
				fs.writeFileSync(p, updatedHtml);
			}

			// console.log(`✔ ${p} references updated`);
		}
	}

	fs.writeFileSync(cacheDirectoryPath, YAML.stringify(cache));
}
