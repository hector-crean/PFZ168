interface Route {
	path: string;
	fileName: string;
}

import { Tree } from "./models/tree";

const tree: Tree = [

	{
		kind: "branch", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
		path: "sections/background",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background",
		name: "Background",

		disabled: false,
		children: [
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/background/elranatamab",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background\\elranatamab",
				name: "Elranatamab",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/background/multiple-myeloma",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background\\multiple-myeloma",
				name: "Multiple Myeloma",

				disabled: false,
			},
		],
	},
	{
		kind: "branch", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
		path: "sections/results",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results",
		name: "Results",

		disabled: false,
		children: [
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/durability-of-response",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\durability-of-response",
				name: "Durability Of Response",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/duration-of-response",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\duration-of-response",
				name: "Duration Of Response",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/objective-response-rate",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\objective-response-rate",
				name: "Objective Response Rate",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/overall-survival",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\overall-survival",
				name: "Overall Survival",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/progression-free-survival",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\progression-free-survival",
				name: "Progression Free Survival",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/results/treatment-summary",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\treatment-summary",
				name: "Treatment Summary",

				disabled: false,
			},
		],
	},
	{
		kind: "branch", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
		path: "sections/safety",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety",
		name: "Safety",

		disabled: false,
		children: [
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/safety/adverse-events-of-special-interest",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety\\adverse-events-of-special-interest",
				name: "Adverse Events Of Special Interest",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/safety/safety-profile",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety\\safety-profile",
				name: "Safety Profile",

				disabled: false,
			},
		],
	},
	{
		kind: "leaf",
		heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
		path: "sections/study-conclusions",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\study-conclusions",
		name: "Study Conclusions",

		disabled: false,
	},
	{
		kind: "branch", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
		path: "sections/trial-design",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design",
		name: "Trial Design",

		disabled: false,
		children: [
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/trial-design/demographics",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\demographics",
				name: "Demographics",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/trial-design/dosing-schedule",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\dosing-schedule",
				name: "Dosing Schedule",

				disabled: false,
			},
			{
				kind: "leaf", heroImage: 'https://www.pfizer.co.uk/thumbnail_8003655.jpg',
				path: "sections/trial-design/phase-2-study",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\phase-2-study",
				name: "Phase 2 Study",

				disabled: false,
			},
		],
	},
];

export { tree };
