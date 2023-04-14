interface Route {
	path: string;
	fileName: string;
}

import { Tree } from "./models/tree";

const tree: Tree = [
	{
		kind: "branch",
		path: "study",
		file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study",
		name: "Study",
		baseColor: {
			h: "20deg",
			s: "80%",
			l: "40%",
		},
		disabled: false,
		children: [
			{
				kind: "branch",
				path: "study/background",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background",
				name: "Background",
				baseColor: {
					h: "20deg",
					s: "80%",
					l: "40%",
				},
				disabled: false,
				children: [
					{
						kind: "leaf",
						path: "study/background/elranatamab",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background\\elranatamab",
						name: "Elranatamab",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/background/multiple-myeloma",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\background\\multiple-myeloma",
						name: "Multiple Myeloma",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
				],
			},
			{
				kind: "branch",
				path: "study/results",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results",
				name: "Results",
				baseColor: {
					h: "20deg",
					s: "80%",
					l: "40%",
				},
				disabled: false,
				children: [
					{
						kind: "leaf",
						path: "study/results/durability-of-response",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\durability-of-response",
						name: "Durability Of Response",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/results/duration-of-response",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\duration-of-response",
						name: "Duration Of Response",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/results/objective-response-rate",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\objective-response-rate",
						name: "Objective Response Rate",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/results/overall-survival",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\overall-survival",
						name: "Overall Survival",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/results/progression-free-survival",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\progression-free-survival",
						name: "Progression Free Survival",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/results/treatment-summary",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\results\\treatment-summary",
						name: "Treatment Summary",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
				],
			},
			{
				kind: "branch",
				path: "study/safety",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety",
				name: "Safety",
				baseColor: {
					h: "20deg",
					s: "80%",
					l: "40%",
				},
				disabled: false,
				children: [
					{
						kind: "leaf",
						path: "study/safety/adverse-events-of-special-interest",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety\\adverse-events-of-special-interest",
						name: "Adverse Events Of Special Interest",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/safety/safety-profile",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\safety\\safety-profile",
						name: "Safety Profile",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
				],
			},
			{
				kind: "leaf",
				path: "study/study-conclusions",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\study-conclusions",
				name: "Study Conclusions",
				baseColor: {
					h: "20deg",
					s: "80%",
					l: "40%",
				},
				disabled: false,
			},
			{
				kind: "branch",
				path: "study/trial-design",
				file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design",
				name: "Trial Design",
				baseColor: {
					h: "20deg",
					s: "80%",
					l: "40%",
				},
				disabled: false,
				children: [
					{
						kind: "leaf",
						path: "study/trial-design/demographics",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\demographics",
						name: "Demographics",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/trial-design/dosing-schedule",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\dosing-schedule",
						name: "Dosing Schedule",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
					{
						kind: "leaf",
						path: "study/trial-design/phase-2-study",
						file: "C:\\Users\\hector.c\\desktop\\projects\\react-charts\\src\\app\\study\\trial-design\\phase-2-study",
						name: "Phase 2 Study",
						baseColor: {
							h: "20deg",
							s: "80%",
							l: "40%",
						},
						disabled: false,
					},
				],
			},
		],
	},
];

export { tree };
