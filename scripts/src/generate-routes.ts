import fs from "fs";
import path from "path";

type Hsl = { h: `${number}deg`; s: `${number}%`; l: `${number}%` };

interface Leaf {
	kind: "leaf";
	path: string;
	file: string;
	name: string;
	baseColor: Hsl;
	disabled: boolean;
}

interface Branch {
	kind: "branch";
	name: string;
	path: string;
	file: string;
	baseColor: Hsl;
	disabled: boolean;
	children: Node[];
}

type Node = Leaf | Branch;

type Tree = Array<Node>;

const directoryHasFile = (
	directoryPath: string,
	filename: string,
	fileExtension: string,
): boolean => {
	const filePath = path.join(directoryPath, `${filename}.${fileExtension}`);

	try {
		const stats = fs.statSync(filePath);
		return stats.isFile();
	} catch {
		return false;
	}
};

interface Route {
	path: string;
	file: string;
}

const getRoutes = (
	rootDirPath: string,
	dirPath: string,
	routes: Route[] = [],
): Route[] => {
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			// Extract the route from the directory name
			const route = path.relative(rootDirPath, filePath);

			const filePredicate = directoryHasFile(filePath, "page", "tsx");

			if (filePredicate) {
				routes.push({
					path: `/${route === "" ? "" : route.replace(/\\/g, "/")}`,
					file: filePath,
				});
			}

			// Recursively search subdirectories
			getRoutes(rootDirPath, filePath, routes);
		}
	});

	return routes;
};

const convertToSentenceCase = (input: string): string => {
	// Replace kebab or snake case separators with spaces
	const spacedInput = input.replace(/[-_]/g, " ");

	// Split the input into words
	const words = spacedInput.split(" ");

	// Capitalise the first letter of each word
	const capitalisedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);

	// Join the words back together with spaces
	const sentence = capitalisedWords.join(" ");

	return sentence;
};

const extractFileName = (path: string) => {
	const fileName = path.split("/").at(-1);
	return convertToSentenceCase(fileName ? fileName : "");
};

const extractRoutestoTree = (dirPath: string, baseRoute = ""): Tree => {
	const files = fs.readdirSync(dirPath);

	const tree: Tree = [];

	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			const relativeDirectoryPath = path.relative(baseRoute, filePath);
			const normalisedRelativeDirectoryPath = relativeDirectoryPath.replace(
				/\\/g,
				"/",
			);

			const childRoutes = extractRoutestoTree(filePath, baseRoute);

			const hasPageFilePredicate = directoryHasFile(filePath, "page", "tsx");

			if (hasPageFilePredicate) {
				const leaf: Leaf = {
					kind: "leaf",
					path: normalisedRelativeDirectoryPath,
					file: filePath,
					name: extractFileName(normalisedRelativeDirectoryPath),
					baseColor: { h: "20deg", s: "80%", l: "40%" },
					disabled: false,
				};
				tree.push(leaf);
			} else {
				const branch: Branch = {
					kind: "branch",
					path: normalisedRelativeDirectoryPath,
					file: filePath,
					name: extractFileName(normalisedRelativeDirectoryPath),
					baseColor: { h: "20deg", s: "80%", l: "40%" },
					disabled: false,
					children: childRoutes,
				};
				tree.push(branch);
			}
		} else if (file === "page.tsx") {
			// const relativeDirectoryPath = path.relative(baseRoute, filePath);
			// const normalisedRelativeDirectoryPath = relativeDirectoryPath.replace(
			// 	/\\/g,
			// 	"/",
			// );
			// const leaf: Leaf = {
			// 	kind: "leaf",
			// 	path: normalisedRelativeDirectoryPath,
			// 	file: filePath,
			// 	name: extractFileName(normalisedRelativeDirectoryPath),
			// 	baseColor: { h: "20deg", s: "80%", l: "40%" },
			// 	disabled: false,
			// };
			// tree.push(leaf);
		}
	});

	return tree;
};

export { getRoutes, extractRoutestoTree };
