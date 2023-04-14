import { Group } from "@/lib/visx-group";
import { ParentSize } from "@/lib/visx-responsive";
import { scaleLinear } from "@/lib/visx-scale";
import { Text } from "@/lib/visx-text";
import { Tooltip, useTooltip } from "@/lib/visx-tooltip";
import { SankeyNode, sankey as d3Sankey, type SankeyGraph } from "d3-sankey";
import { linkHorizontal } from "d3-shape";
import { useCallback, useMemo, useRef, useState } from "react";
import { Margin } from "../types";
import { type Graph } from "./traits/graph-traits";


type Dose = "D1" | "D2" | "D3" | "D4";
type GradeCategory = "G0" | "G1" | "G2" | "G3+";
type NodeData = { name: string };
type EdgeData = { weight: number };

export const dosingGraph: Graph<NodeData, EdgeData, "directed", string> = {
	ty: "directed",
	nodes: [
		{ idx: "D1.G0", datum: { name: "Grade 0" } },
		{ idx: "D1.G1", datum: { name: "Grade 1" } },
		{ idx: "D1.G2", datum: { name: "Grade 2" } },
		{ idx: "D2.G0", datum: { name: "Grade 0" } },
		{ idx: "D2.G1", datum: { name: "Grade 1" } },
		{ idx: "D2.G2", datum: { name: "Grade 2" } },
		{ idx: "D3.G0", datum: { name: "Grade 0" } },
		{ idx: "D3.G1", datum: { name: "Grade 1" } },
		{ idx: "D3.G2", datum: { name: "Grade 2" } },
		{ idx: "D4.G0", datum: { name: "Grade 0" } },
		{ idx: "D4.G1", datum: { name: "Grade 1" } },
		// { idx: "D4.G2", datum: { name: "Grade 2" } },
	],
	edges: [
		{
			idx: "D1.G0-D2.G0",
			source: "D1.G0",
			target: "D2.G0",
			datum: { weight: 53 },
		},
		{
			idx: "D1.G0-D2.G1",
			source: "D1.G0",
			target: "D2.G1",
			datum: { weight: 9 },
		},
		{
			idx: "D1.G0-D2.G2",
			source: "D1.G0",
			target: "D2.G2",
			datum: { weight: 1 },
		},

		{
			idx: "D1.G1-D2.G0",
			source: "D1.G1",
			target: "D2.G0",
			datum: { weight: 31 },
		},
		{
			idx: "D1.G1-D2.G1",
			source: "D1.G1",
			target: "D2.G1",
			datum: { weight: 8 },
		},
		{
			idx: "D1.G1-D2.G2",
			source: "D1.G1",
			target: "D2.G2",
			datum: { weight: 1 },
		},

		{
			idx: "D1.G2-D2.G0",
			source: "D1.G2",
			target: "D2.G0",
			datum: { weight: 11 },
		},
		{
			idx: "D1.G2-D2.G1",
			source: "D1.G2",
			target: "D2.G1",
			datum: { weight: 1 },
		},
		{
			idx: "D1.G2-D2.G2",
			source: "D1.G2",
			target: "D2.G2",
			datum: { weight: 1 },
		},


		//
		{
			idx: "D2.G0-D3.G0",
			source: "D2.G0",
			target: "D3.G0",
			datum: { weight: 87 },
		},
		{
			idx: "D2.G0-D3.G1",
			source: "D2.G0",
			target: "D3.G1",
			datum: { weight: 6 },
		},
		{
			idx: "D2.G0-D3.G2",
			source: "D2.G0",
			target: "D3.G2",
			datum: { weight: 2 },
		},


		{
			idx: "D2.G1-D3.G0",
			source: "D2.G1",
			target: "D3.G0",
			datum: { weight: 21 },
		},
		// {
		// 	idx: "D2.G1-D3.G1",
		// 	source: "D2.G1",
		// 	target: "D3.G1",
		// 	datum: { weight: 0 },
		// },
		// {
		// 	idx: "D2.G1-D3.G2",
		// 	source: "D2.G1",
		// 	target: "D3.G2",
		// 	datum: { weight: 0 },
		// },

		{
			idx: "D2.G2-D3.G0",
			source: "D2.G2",
			target: "D3.G0",
			datum: { weight: 3 },
		},
		// {
		// 	idx: "D2.G2-D3.G0",
		// 	source: "D2.G2",
		// 	target: "D3.G1",
		// 	datum: { weight: 0 },
		// },
		// {
		// 	idx: "D2.G2-D3.G0",
		// 	source: "D2.G2",
		// 	target: "D3.G2",
		// 	datum: { weight: 0 },
		// },




		{
			idx: "D3.G0-D4.G0",
			source: "D3.G0",
			target: "D4.G0",
			datum: { weight: 111 },
		},
		{
			idx: "D3.G0-D4.G1",
			source: "D3.G0",
			target: "D4.G1",
			datum: { weight: 1 },
		},
		// {
		// 	idx: "D3.G0-D4.G2",
		// 	source: "D3.G0",
		// 	target: "D4.G2",
		// 	datum: { weight: 1 },
		// },

		{
			idx: "D3.G1-D4.G0",
			source: "D3.G1",
			target: "D4.G0",
			datum: { weight: 5 },
		},
		// {
		// 	idx: "D3.G1-D4.G1",
		// 	source: "D3.G1",
		// 	target: "D4.G1",
		// 	datum: { weight: 0 },
		// },
		// {
		// 	idx: "D3.G1-D4.G2",
		// 	source: "D3.G1",
		// 	target: "D4.G2",
		// 	datum: { weight: 0 },
		// },

		{
			idx: "D3.G2-D4.G0",
			source: "D3.G2",
			target: "D4.G0",
			datum: { weight: 2 },
		},
		// {
		// 	idx: "D3.G2-D4.G1",
		// 	source: "D3.G2",
		// 	target: "D4.G1",
		// 	datum: { weight: 0 },
		// },
		// {
		// 	idx: "D3.G2-D4.G2",
		// 	source: "D3.G2",
		// 	target: "D4.G2",
		// 	datum: { weight: 0 },
		// },

	],
};

const projector = (
	graph: Graph<NodeData, EdgeData, "directed", string>,
): SankeyGraph<NodeData & { idx: string }, EdgeData & { idx: string }> => {
	return {
		nodes: graph.nodes.map((n) => ({ ...n.datum, idx: n.idx })),
		links: graph.edges.map((e) => ({
			...e.datum,
			value: e.datum.weight,
			idx: e.idx,
			source: e.source,
			target: e.target,
		})),
	};
};

interface SankeyProps {
	margin: Margin;
	width: number;
	height: number;
	graph: Graph<NodeData, EdgeData, "directed", string>;
}




const Sankey = ({ margin, width, height, graph }: SankeyProps) => {

	const innerWidth = width + margin.left + margin.right;
	const innerHeight = height + margin.top + margin.bottom;

	const { hideTooltip,
		showTooltip,
		tooltipOpen,
		tooltipData,
		tooltipLeft,
		tooltipTop, } = useTooltip<SankeyNode<NodeData & {
			idx: string;
		}, EdgeData & {
			idx: string;
		}>>()

	const svgRef = useRef<SVGSVGElement>(null);

	const [highlightLinkIndexes, setHighlightLinkIndexes] = useState([]);

	const xScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [1.3, 2.2],
				range: [0, width],
				clamp: true,
			}),
		[width],
	);
	const yScale = useMemo(
		() =>
			scaleLinear<number>({
				domain: [0.75, 1.6],
				range: [height, 0],
				clamp: true,
			}),
		[height],
	);


	const sankeyLayoutData = useMemo(
		() =>
			d3Sankey<
				NodeData & { idx: string },
				EdgeData & { idx: string }
			>()
				.nodeId((d) => d.idx)
				.nodeWidth(50)
				.nodePadding(10)
				.extent([
					[0, 0],
					[width, height],
				])
				.iterations(32)(projector(graph)),
		[width, height, xScale, yScale, graph],
	);



	// event handlers
	const handlePointerOver = useCallback(
		(event: PointerEvent) => {
			if (!svgRef.current) return;




		},
		[xScale, yScale, showTooltip, sankeyLayoutData],
	);

	const handlePointerLeave = useCallback(() => {

	}, [hideTooltip]);


	console.log(tooltipData)



	return (
		<div style={{ position: 'relative', width: '100%', height: '100%' }}>
			<svg
				ref={svgRef}
				width={width}
				height={height}
			>
				{/* <GradientOrangeRed id="dots-pink" /> */}

				<rect
					pointerEvents={'none'}
					width={width}
					height={height}
					rx={0}
					fill="white"

				/>
				<Group>
					{sankeyLayoutData.nodes.map((node, i) => (
						<Group top={node.y0} left={node.x0} key={`node-${i}`}>
							<rect
								id={`rect-${i}`}
								width={node.x1 - node.x0}
								height={node.y1 - node.y0}
								fill={"hsl(205, 100%, 39%)"}
								opacity={0.5}
								stroke="white"
								strokeWidth={2}
								onPointerOver={(e) => {
									showTooltip({
										tooltipLeft: node.x1,
										tooltipTop: node.y1,
										tooltipData: node,
									});
									setHighlightLinkIndexes([
										...node.sourceLinks.map((l) => l.index),
										...node.targetLinks.map((l) => l.index),
									]);
								}}
								onPointerOut={(e) => {
									hideTooltip();

									setHighlightLinkIndexes([]);
								}}
							/>

							<Text
								x={7}
								y={(node.y1 - node.y0) / 2}
								verticalAnchor="middle"
								style={{
									font: "10px sans-serif",
								}}
							>
								{node.name}
							</Text>
						</Group>
					))}

					<Group>
						{sankeyLayoutData.links.map((link, i) => (
							<path
								key={`link-${i}`}
								d={linkHorizontal()
									.source((d) => [d.source.x1, d.y0])
									.target((d) => [d.target.x0, d.y1])(link)}
								// stroke='black'
								stroke={highlightLinkIndexes.includes(i) ? "red" : "black"}
								strokeWidth={Math.max(1, link.width)}
								// opacity={0.2}
								opacity={highlightLinkIndexes.includes(i) ? 0.5 : 0.15}
								fill="none"
								onPointerOver={(e) => {
									setHighlightLinkIndexes([i]);
								}}
								onPointerOut={(e) => {
									setHighlightLinkIndexes([]);
								}}
							/>
						))}
					</Group>

				</Group>
			</svg>
			{tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
				<Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
					<table>
						<tr>
							<th scope='col'>Dose</th>
							<td>{tooltipData.depth + 1}</td>
						</tr>
						<tr>
							<th scope='col'>Patients</th>
							<td>{tooltipData.value}</td>
						</tr>
						<caption>{<strong>{tooltipData.name}</strong>}</caption>
					</table>

				</Tooltip>
			)}
		</div>
	);

}




const ResponsiveSankeyChart = () => (
	<ParentSize>
		{({ width, height }) => (
			<Sankey
				width={width}
				height={height}
				margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
				graph={dosingGraph}
			/>
		)}
	</ParentSize>
);

export { ResponsiveSankeyChart };
