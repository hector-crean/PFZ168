import { buildChartTheme } from "@/lib/visx-xychart";

const customTheme = buildChartTheme({
	backgroundColor: "#f09ae9",
	colors: ["rgba(255,231,143,0.8)", "#6a097d", "#d6e0f0"],
	gridColor: "#336d88",
	gridColorDark: "#1d1b38",
	svgLabelBig: { fill: "#1d1b38" },
	tickLength: 8,
});

export { customTheme };
