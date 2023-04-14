import React, { CSSProperties, useMemo } from "react";
import { BarStack } from "@/lib/visx-shape";
import { SeriesPoint } from "@/lib/visx-shape/types";
import { Group } from "@/lib/visx-group";
import { Grid } from "@/lib/visx-grid";
import { AxisBottom, AxisLeft } from "@/lib/visx-axis";

import { scaleBand, scaleLinear, scaleOrdinal } from "@/lib/visx-scale";
import {
	useTooltip,
	useTooltipInPortal,
	defaultStyles,
} from "@/lib/visx-tooltip";
// import { LegendOrdinal } from '@/lib/visx-legend';
import { localPoint } from "@/lib/visx-event";
import { ParentSize } from "@/lib/visx-responsive";
import { type ObjectiveResponseRatePerBICR } from "@/models/patient";

enum Rank {
	one = 1,
	two = 2,
	three = 3,
}

type NumericalValue = { n: number; tag: string };

interface DatumMap {
	[Rank.one]: { y: NumericalValue; x1: NumericalValue };
	[Rank.two]: { y: NumericalValue; x1: NumericalValue; x2: NumericalValue };
	[Rank.three]: {
		y: NumericalValue;
		x1: NumericalValue;
		x2: NumericalValue;
		x3: NumericalValue;
	};
}

type TooltipData<R extends Rank> = {
	bar: SeriesPoint<DatumMap[R]>;
	key: ObjectiveResponseRatePerBICR;
	index: number;
	height: number;
	width: number;
	x: number;
	y: number;
	color: string;
};

export type BarStackProps<T, R extends Rank> = {
	rank: R;
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	rawData: Array<T>;
	projector: (from: T) => DatumMap[R];
};

const BarChart = <T, R extends Rank>({
	width,
	height,
	rawData,
	projector,
	margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: BarStackProps<T, R>) => {
	const tooltipStyles: CSSProperties = {
		...defaultStyles,
		minWidth: 60,
		backgroundColor: "rgba(0,0,0,0.9)",
		color: "white",
	};
	//

	const {
		tooltipOpen,
		tooltipLeft,
		tooltipTop,
		tooltipData,
		hideTooltip,
		showTooltip,
	} = useTooltip<TooltipData<R>>();

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		// TooltipInPortal is rendered in a separate child of <body /> and positioned
		// with page coordinates which should be updated on scroll. consider using
		// Tooltip or TooltipWithBounds if you don't need to render inside a Portal
		scroll: true,
	});

	// bounds
	const innerWidth = useMemo(() => width - margin.left - margin.right, [width]);
	const innerHeight = useMemo(
		() => height - margin.top - margin.bottom,
		[height],
	);

	const data = rawData.map(projector);

	// accessors
	const yAccessor = (d: DatumMap[R]) => d.y;

	// scales

	const xScale = useMemo(
		() =>
			scaleBand<string>({
				range: [0, innerWidth],
				round: true,
				domain: data.map((d) => d.x1.tag),
				padding: 0.4,
			}),
		[innerWidth],
	);

	const minYValue = useMemo(
		() => Math.min(...responseRateTotals),
		[responseRateTotals],
	);
	const maxYValue = useMemo(
		() => Math.max(...responseRateTotals),
		[responseRateTotals],
	);

	const yScale = useMemo(
		() =>
			scaleLinear<number>({
				range: [innerHeight, 0],
				round: true,
				domain: [minYValue, maxYValue],
			}),
		[yMax],
	);

	const colorScale = scaleOrdinal<ObjectiveResponseRatePerBICR, string>({
		domain: keys,
		range: [purple1, purple2, purple3],
	});

	let tooltipTimeout: number;

	return width < 10 ? null : (
		<div style={{ position: "relative" }}>
			<svg ref={containerRef} width={width} height={height}>
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					fill={background}
					rx={0}
				/>
				<Grid
					top={margin.top}
					left={margin.left}
					xScale={xScale}
					yScale={yScale}
					width={xMax}
					height={yMax}
					stroke="black"
					strokeOpacity={0.1}
					xOffset={xScale.bandwidth() / 2}
				/>

				<Group left={margin.left} top={margin.top}>
					<AxisLeft scale={yScale} />

					<AxisBottom
						top={yScale(yMax)}
						scale={xScale}
						stroke={purple3}
						tickStroke={purple3}
						tickLabelProps={{
							fill: purple3,
							fontSize: 11,
							textAnchor: "middle",
						}}
					/>
					<AxisLeft scale={yScale} />

					<BarStack<ObjectiveResponseRateByCohort, ObjectiveResponseRatePerBICR>
						data={data}
						keys={keys}
						x={getCohort}
						xScale={xScale}
						yScale={yScale}
						color={colorScale}
					>
						{(barStacks) =>
							barStacks.map((barStack) =>
								barStack.bars.map((bar) => (
									<rect
										key={`bar-stack-${barStack.index}-${bar.index}`}
										x={bar.x}
										y={bar.y}
										height={bar.height}
										width={bar.width}
										fill={bar.color}
										onPointerDown={() => {
											if (events) alert(`clicked: ${JSON.stringify(bar)}`);
										}}
										onPointerLeave={() => {
											tooltipTimeout = window.setTimeout(() => {
												hideTooltip();
											}, 300);
										}}
										onPointerMove={(event) => {
											if (tooltipTimeout) clearTimeout(tooltipTimeout);
											// TooltipInPortal expects coordinates to be relative to containerRef
											// localPoint returns coordinates relative to the nearest SVG, which
											// is what containerRef is set to in this example.
											const eventSvgCoords = localPoint(event);
											const left = bar.x + bar.width / 2;
											showTooltip({
												tooltipData: bar,
												tooltipTop: eventSvgCoords?.y,
												tooltipLeft: left,
											});
										}}
									/>
								)),
							)
						}
					</BarStack>
				</Group>
			</svg>
			<div
				style={{
					position: "absolute",
					top: margin.top / 2 - 10,
					width: "100%",
					display: "flex",
					justifyContent: "center",
					fontSize: "14px",
				}}
			>
				{/* <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0" /> */}
			</div>

			{tooltipOpen && tooltipData && (
				<TooltipInPortal
					top={tooltipTop}
					left={tooltipLeft}
					style={tooltipStyles}
				>
					<div style={{ color: colorScale(tooltipData.key) }}>
						<strong>{tooltipData.key}</strong>
					</div>
					<div>
						{tooltipData.bar.data[tooltipData.key]}
						<span>%</span>
					</div>
					<div>
						<small>{getCohort(tooltipData.bar.data)}</small>
					</div>
				</TooltipInPortal>
			)}
		</div>
	);
};

const ResponsiveBarChart = () => (
	<ParentSize>
		{({ width, height }) => <Example width={width} height={height} />}
	</ParentSize>
);

export { ResponsiveBarChart };
