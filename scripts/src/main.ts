// import { getRoutes, extractRoutestoTree } from "./generate-routes";

// const ROOT_DIR =
// 	"C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app";

// const main = () => {
// 	// const routes = getRoutes(ROOT_DIR, ROOT_DIR);

// 	const routes = extractRoutestoTree(ROOT_DIR, ROOT_DIR);
// 	const printout = JSON.stringify(routes, null, 4);
// 	console.log(printout);

// 	// console.log(
// 	// 	routes.map((r) => ({ path: r.path, fileName: extractFileName(r.path) })),
// 	// );
// };

// main();

import { generateResponseTimelines } from "./order-data";
import { writeFileSync } from "fs";

const timelines = generateResponseTimelines();

writeFileSync(
	"C:\\Users\\hector.c\\Desktop\\projects\\PFZ168\\scripts\\src\\data.ts",
	JSON.stringify(timelines),
);
