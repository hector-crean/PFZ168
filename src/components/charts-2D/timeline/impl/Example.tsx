"use client";
import { AxisBottom, AxisLeft } from "@/lib/visx-axis";
import { localPoint } from "@/lib/visx-event";
import { GlyphCircle } from "@/lib/visx-glyph";
import { GridColumns, GridRows } from "@/lib/visx-grid";
import { Group } from "@/lib/visx-group";
import { ParentSize } from "@/lib/visx-responsive";
import { scaleLinear, scaleOrdinal, scaleTime } from "@/lib/visx-scale";
import { Bar } from "@/lib/visx-shape";
import {
	Tooltip,
	defaultStyles,
	useTooltip,
	useTooltipInPortal,
} from "@/lib/visx-tooltip";
import { Margin } from "@/lib/visx-xychart";
import { useMemo, useState } from "react";
import {
	TimeEvent,
	TimeInterval,
	Timelines,
	extractDatesFromTimeline,
} from "../timeline";
import { timelines } from "./timeline-data";
import { Mat3 } from "@/components/charts-2D/types";
import { ScaleLinear } from "d3-scale";
import { Zoom, applyMatrixToPoint } from "@/lib/visx-zoom";
import { RectClipPath } from "@/lib/visx-clip-path";

const purple1 = "#84838d";
const purple2 = "#060408";
export const purple3 = "#ff8000";
export const background = "#eaedff";
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 };

function extent<Datum>(
	data: Datum[],
	projector: (d: Datum) => number,
): [min: number, max: number] {
	const values = data.map(projector);
	return [Math.min(...values), Math.max(...values)];
}

let tooltipTimeout: number;
const tooltipStyles = {
	...defaultStyles,
	minWidth: 60,
	backgroundColor: "rgba(0,0,0,0.9)",
	color: "white",
};

function TimelineImpl<
	const EventKind,
	EventKinds extends EventKind[],
	const IntervalKind,
	IntervalKinds extends IntervalKind[],
>({
	width,
	height,
	margin,
	timelines,
}: {
	width: number;
	height: number;
	margin: Margin;
	timelines: Array<{
		eventKinds: EventKinds;
		intervalKinds: IntervalKinds;
		events: Array<TimeEvent<EventKinds[number]>>;
		intervals: Array<TimeInterval<IntervalKinds[number]>>;
	}>;
}) {
	const TIMELINE_TRACK_HEIGHT = 30;
	const AXIS_COLOR = "transparent";
	const GRID_COLOR = "#ccc";
	const TICK_LABEL_COLOR = "#999";
	const DOT_COLOR = "rgba(0,0,200,0.3)";
	const DOT_OUTLINE_COLOR = "#fff";

	const initialTransform: Mat3 = {
		scaleX: 1.27,
		scaleY: 1.27,
		translateX: -211.62,
		translateY: 162.59,
		skewX: 0,
		skewY: 0,
	};
	const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

	// in svg, margin is subtracted from total width/height
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xDomain = useMemo(
		() =>
			extent(
				timelines.flatMap(extractDatesFromTimeline),
				(date: number) => date,
			),
		[timelines],
	);
	// scales
	const xScale = scaleLinear({
		range: [0, innerWidth],
		domain: xDomain,
	});

	const yScale = scaleLinear({
		range: [innerHeight, 0],
		domain: [timelines.length, 0],
	});

	const bicrResponsColorScale = scaleOrdinal({
		domain: [
			"StringentCompleteResponse",
			"CompleteResponse",
			"VeryGoodPartialResponse",
			"PatialResponse",
			"StableDisease",
			"MinimalResponse",
		],
		range: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
	});

	const eventColorScale = scaleOrdinal({
		domain: [
			"EotDueToAe",
			"EotDueToOther",
			"EotDueToPd",
			"Death",
			"ConfirmedPd",
		],
		range: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
	});

	const rescaleYAxis = (
		scale: ScaleLinear<number, number, never>,
		zoom: Mat3,
	) => {
		const newDomain = scale.range().map((r) => {
			return scale.invert((r - zoom.translateY) / zoom.scaleY);
		});
		return scale.copy().domain(newDomain);
	};
	const rescaleXAxis = (
		scale: ScaleLinear<number, number, never>,
		zoom: Mat3,
	) => {
		let newDomain = scale.range().map((r) => {
			return scale.invert((r - zoom.translateX) / zoom.scaleX);
		});
		return scale.copy().domain(newDomain);
	};

	const zoomContraint =
		(
			bottomLeft: { x: number; y: number },
			topRight: { x: number; y: number },
		) =>
		(mat3: Mat3, prevMat3: Mat3) => {
			const min = applyMatrixToPoint(mat3, {
				x: bottomLeft.x,
				y: bottomLeft.y,
			});
			const max = applyMatrixToPoint(mat3, { x: topRight.x, y: topRight.y });
			if (max.x < width || max.y < height) {
				return prevMat3;
			}
			if (min.x > 0 || min.y > 0) {
				return prevMat3;
			}
			return mat3;
		};

	const reversedTimelines = useMemo(() => timelines.reverse(), [timelines]);

	const {
		tooltipOpen,
		tooltipLeft,
		tooltipTop,
		tooltipData,
		hideTooltip,
		showTooltip,
	} = useTooltip<
		TimeEvent<EventKinds[number]> | TimeInterval<IntervalKinds[number]>
	>();

	if (width < 16) return null;
	return (
		<>
			<Zoom<SVGSVGElement>
				width={width}
				height={height}
				scaleXMin={1 / 2}
				scaleXMax={4}
				scaleYMin={1 / 2}
				scaleYMax={4}
				initialTransformMatrix={initialTransform}
				// constrain={zoomContraint(
				// 	{ x: 0, y: 0 },
				// 	{ x: xScale(xDomain[1]), y: yScale(timelines.length) },
				// )}
				// wheelDelta={(event) => event.deltaY < 0 ? { k: 1.1 } : { k: 1 / 1.1 }}
			>
				{(zoom) => (
					<div className="relative">
						<svg
							width={width}
							height={height}
							style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
						>
							<RectClipPath id="zoom-clip" width={width} height={height} />

							<rect width={width} height={width} fill={"white"} rx={0} />

							<Group
								top={margin.top}
								left={margin.left}
								transform={zoom.toString()}
							>
								{reversedTimelines

								.map(
									(
										{ events: timelineEvents, intervals: timelineIntervals },
										timelineIdx,
									) => {
										return (
											<Group key={`timeline-${timelineIdx}`}>
												{timelineIntervals.map(
													(timelineInterval, timelineIntervalIdx) => (
														<Bar
															key={`timeline-interval-${timelineIdx}-${timelineIntervalIdx}`}
															x={xScale(new Date(timelineInterval.start))}
															y={
																yScale(timelineIdx) -
																(0.5 * Math.abs(yScale(1) - yScale(0))) / 5
															}
															width={
																xScale(new Date(timelineInterval.end)) -
																xScale(new Date(timelineInterval.start))
															}
															height={Math.abs(yScale(1) - yScale(0)) / 2}
															fill={eventColorScale(timelineInterval.kind)}
															onPointerLeave={() => {
																tooltipTimeout = window.setTimeout(() => {
																	hideTooltip();
																}, 300);
															}}
															onPointerMove={(event) => {
																if (tooltipTimeout)
																	clearTimeout(tooltipTimeout);
																// TooltipInPortal expects coordinates to be relative to containerRef
																// localPoint returns coordinates relative to the nearest SVG, which
																// is what containerRef is set to in this example.
																const eventSvgCoords = localPoint(event);
																const tooltipLeft =
																	xScale(new Date(timelineInterval.start)) +
																	0.5 *
																		(xScale(new Date(timelineInterval.end)) -
																			xScale(new Date(timelineInterval.start)));
																showTooltip({
																	tooltipData: timelineInterval,
																	tooltipTop: eventSvgCoords?.y,
																	tooltipLeft,
																});
															}}
														/>
													),
												)}
												{timelineEvents.map(
													(timelineEvent, timelineEventIdx) => (
														<GlyphCircle
															key={`timeline-event-${timelineIdx}-${timelineEventIdx}`}
															left={xScale(new Date(timelineEvent.date))}
															top={yScale(timelineIdx)}
															fill={"blue"}
															onPointerLeave={() => {
																tooltipTimeout = window.setTimeout(() => {
																	hideTooltip();
																}, 300);
															}}
															onPointerMove={(event) => {
																if (tooltipTimeout)
																	clearTimeout(tooltipTimeout);
																// TooltipInPortal expects coordinates to be relative to containerRef
																// localPoint returns coordinates relative to the nearest SVG, which
																// is what containerRef is set to in this example.
																const eventSvgCoords = localPoint(event);
																const tooltipLeft = xScale(
																	new Date(timelineEvent.date),
																);
																showTooltip({
																	tooltipData: timelineEvent,
																	tooltipTop: eventSvgCoords?.y,
																	tooltipLeft,
																});
															}}
														/>
													),
												)}
											</Group>
										);
									},
								)}
							</Group>
							{/* <GridRows
									key={`gridrows`}
									scale={rescaleYAxis(yScale, zoom.transformMatrix)}
									stroke={GRID_COLOR}
									width={innerWidth}
									numTicks={timelines.length}
								/>
								<GridColumns
									key={`gridcolumns`}
									scale={rescaleXAxis(xScale, zoom.transformMatrix)}
									stroke={GRID_COLOR}
									height={innerHeight}
								/> */}
							<AxisBottom
								scale={rescaleXAxis(xScale, zoom.transformMatrix)}
								hideAxisLine={true}
								top={innerHeight}
								stroke={purple3}
								tickStroke={purple3}
								tickLabelProps={{
									fill: purple3,
									fontSize: 11,
									textAnchor: "middle",
								}}
							/>
							<AxisLeft
								hideAxisLine={true}
								scale={rescaleYAxis(yScale, zoom.transformMatrix)}
								numTicks={timelines.length}
								stroke={purple3}
								tickStroke={purple3}
								tickLabelProps={{
									fill: purple3,
									fontSize: 11,
									textAnchor: "end",
									dy: "0.33em",
								}}
							/>
							<rect
								width={width}
								height={height}
								rx={0}
								fill="transparent"
								onWheel={(event) => {
									const point = localPoint(event) || { x: 0, y: 0 };
									const scaleFactor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
									zoom.scale({
										scaleX: scaleFactor,
										scaleY: scaleFactor,
										point,
									});
								}}
								onTouchStart={zoom.dragStart}
								onTouchMove={zoom.dragMove}
								onTouchEnd={zoom.dragEnd}
								onMouseDown={zoom.dragStart}
								onMouseMove={zoom.dragMove}
								onMouseUp={zoom.dragEnd}
								onMouseLeave={() => {
									if (zoom.isDragging) zoom.dragEnd();
								}}
								onDoubleClick={(event) => {
									const point = localPoint(event) || { x: 0, y: 0 };
									zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
								}}
							/>
							{tooltipOpen && tooltipData && (
								<Tooltip
									top={tooltipTop}
									left={tooltipLeft}
									style={tooltipStyles}
								>
									<div style={{ color: "whitesmoke" }}></div>
									<div>{tooltipData.description}</div>
								</Tooltip>
							)}
							{showMiniMap && (
								<g
									clipPath="url(#zoom-clip)"
									transform={`scale(0.25) translate(${
										width * 4 - width - 60
									}, ${height * 4 - height - 60})`}
								>
									<rect width={width} height={height} fill="#1a1a1a" />
									{/* {phyllotaxis.map(({ x, y }, i) => (
                                        <Fragment key={`dot-sm-${i}`}>
                                            <motion.circle
                                                initial={false}
                                                animate={{ r: sizeScale(i) }}
                                                key={`circle-${i}`}
                                                cx={x}
                                                cy={y}
                                                r={10}
                                                fill={'red'}
                                            />
                                        </Fragment>
                                    ))} */}
									<rect
										width={width}
										height={height}
										fill="white"
										fillOpacity={0.2}
										stroke="white"
										strokeWidth={4}
										transform={zoom.toStringInvert()}
									/>
								</g>
							)}
						</svg>
					</div>
				)}
			</Zoom>
			<style jsx>{`
 
			.relative {
			position: relative;
			}
		`}</style>
		</>
	);
}

// Define the interval kinds and event kinds
enum IntervalKind {
	Project = "project",
	Meeting = "meeting",
	Vacation = "vacation",
}

enum EventKind {
	Deadline = "deadline",
	TaskCompleted = "task-completed",
}

// // Define an array of timelines
// const timelines: Timelines<
// 	IntervalKind,
// 	EventKind,
// 	[IntervalKind.Project, IntervalKind.Meeting],
// 	[EventKind.Deadline, EventKind.TaskCompleted]
// > = [
// 	{
// 		intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
// 		eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
// 		intervals: [
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-02-08",
// 				end: "2022-03-31",
// 			},
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-04-08",
// 				end: "2022-08-31",
// 			},
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-09-08",
// 				end: "2022-09-31",
// 			},
// 		],
// 		events: [
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2022-03-01",
// 			},
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2022-08-01",
// 			},
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2022-12-01",
// 			},
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2023-01-01",
// 			},
// 		],
// 	},
// 	{
// 		intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
// 		eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
// 		intervals: [
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-02-01",
// 				end: "2022-02-31",
// 			},
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-09-01",
// 				end: "2022-11-31",
// 			},
// 		],
// 		events: [
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2022-03-01",
// 			},
// 		],
// 	},
// 	{
// 		intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
// 		eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
// 		intervals: [
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-02-01",
// 				end: "2022-04-31",
// 			},
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-08-01",
// 				end: "2022-06-31",
// 			},
// 			{
// 				tag: "time-inteveral",
// 				kind: IntervalKind.Meeting,
// 				description: "Weekly Meeting",
// 				start: "2022-10-01",
// 				end: "2022-11-31",
// 			},
// 		],
// 		events: [
// 			{
// 				tag: "time-event",
// 				kind: EventKind.Deadline,
// 				description: "Deadline for Project A",
// 				date: "2022-01-31",
// 			},
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 1 Completed",
// 				date: "2022-02-15",
// 			},
// 			{
// 				tag: "time-event",
// 				kind: EventKind.TaskCompleted,
// 				description: "Task 2 Completed",
// 				date: "2022-03-01",
// 			},
// 		],
// 	},
// ];

const ResponsiveTimeline = () => (
	<ParentSize>
		{({ width, height }) => (
			<TimelineImpl<"generic-interval-tag", never, ["generic-interval-tag"], []>
				width={width}
				height={height}
				margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
				timelines={timelines}
			/>
		)}
	</ParentSize>
);

export { ResponsiveTimeline };
