import * as z from 'zod';


type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type ShortDate = `${Month} ${19 | 20}${Digit}${Digit}` | `${19 | 20}${Digit}${Digit}`

const PubmedRefSchema = z.object({
    kind: z.literal('pubmed').default('pubmed'),
    source: z.string().default(''),
    accessed: z.object({
        'date-parts': z.array(z.array(z.number())),
    }),
    id: z.string(),
    title: z.string().default(''),
    author: z.array(
        z.object({
            family: z.string(),
            given: z.string().optional(),
        }).optional()
    ).default([]),
    'container-title-short': z.string().default(''),
    'container-title': z.string().default(''),
    'publisher-place': z.string().default(''),
    ISSN: z.string().default(''),
    issued: z.object({
        'date-parts': z.array(z.array(z.number())),
    }),
    page: z.string().default(''),
    volume: z.string().default(''),
    PMID: z.string(),
    PMCID: z.string().optional(),
    DOI: z.string().default(''),
    type: z.string(),
});


const UrlReferenceSchema = z.object({
    kind: z.literal('url'),
    url: z.string(),
    authors: z.array(z.string()).optional(),
    title: z.string().optional(),
    journal: z.string().optional(),
    date: z.string().refine((value) => {
        const shortDateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s(19|20)\d{2}$|^(19|20)\d{2}$/;
        return shortDateRegex.test(value);
    }).optional(),
    version: z.string().regex(/^v\d.\d$/).optional(),
    accessed: z.string().refine((value) => {
        const shortDateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s(19|20)\d{2}$|^(19|20)\d{2}$/;
        return shortDateRegex.test(value);
    }).optional(),
});

const CustomReferenceSchema = z.object({
    kind: z.literal('custom'),
    hash: z.string(),
    authors: z.array(z.string()).optional(),
    title: z.string().optional(),
    journal: z.string().optional(),
    date: z.string().refine((value) => {
        const shortDateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s(19|20)\d{2}$|^(19|20)\d{2}$/;
        return shortDateRegex.test(value);
    }).optional(),
    version: z.string().regex(/^v\d.\d$/).optional(),
    accessed: z.string().refine((value) => {
        const shortDateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s(19|20)\d{2}$|^(19|20)\d{2}$/;
        return shortDateRegex.test(value);
    }).optional(),
    volume: z.string().optional(),
    pages: z.string().optional(),
});


const ReferenceSchema = z.union([UrlReferenceSchema, CustomReferenceSchema, PubmedRefSchema]);


const ReferenceCacheSchema = z.map(z.string(), ReferenceSchema)

type UrlReference = z.infer<typeof UrlReferenceSchema>;
type CustomReference = z.infer<typeof CustomReferenceSchema>;
type PubmedReference = z.infer<typeof PubmedRefSchema>;
type Reference = UrlReference | CustomReference | PubmedReference;

type ReferenceCache = z.infer<typeof ReferenceCacheSchema>





export type { Reference, PubmedReference, CustomReference, UrlReference, Month, Digit, ShortDate, ReferenceCache };
export { PubmedRefSchema, ReferenceSchema, CustomReferenceSchema, UrlReferenceSchema, ReferenceCacheSchema };













