
import { AxisBottom, AxisLeft } from "@/lib/visx-axis";
import { localPoint } from "@/lib/visx-event";
import { GlyphCircle } from "@/lib/visx-glyph";
import { GridColumns, GridRows } from "@/lib/visx-grid";
import { Group } from "@/lib/visx-group";
import { ParentSize } from "@/lib/visx-responsive";
import { scaleLinear, scaleTime, } from "@/lib/visx-scale";
import { Bar } from '@/lib/visx-shape';
import { defaultStyles, useTooltip, useTooltipInPortal } from "@/lib/visx-tooltip";
import { Margin } from "@/lib/visx-xychart";
import { useMemo } from "react";
import { TimeEvent, TimeInterval, Timelines, extractDatesFromTimeline } from "../timeline";

const purple1 = '#84838d';
const purple2 = '#060408';
export const purple3 = '#ff8000';
export const background = '#eaedff';
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 };





function extent<Datum>(data: Datum[], projector: (d: Datum) => number): [min: number, max: number] {
    const values = data.map(projector);
    return [Math.min(...values), Math.max(...values)];
}



let tooltipTimeout: number;
const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white"
};

function TimelineImpl<
    const EventKind,
    EventKinds extends EventKind[],
    const IntervalKind,
    IntervalKinds extends IntervalKind[]>
    ({ width, height, margin, timelines }: {
        width: number,
        height: number,
        margin: Margin,
        timelines: Array<{
            eventKinds: EventKinds,
            intervalKinds: IntervalKinds,
            events: Array<TimeEvent<EventKinds[number]>>,
            intervals: Array<TimeInterval<IntervalKinds[number]>>
        }>
    }) {

    const TIMELINE_TRACK_HEIGHT = 30;
    const AXIS_COLOR = "transparent";
    const GRID_COLOR = "#ccc";
    const TICK_LABEL_COLOR = "#999";
    const DOT_COLOR = "rgba(0,0,200,0.3)";
    const DOT_OUTLINE_COLOR = "#fff";

    // in svg, margin is subtracted from total width/height
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xDomain = useMemo(() => extent(timelines.flatMap(extractDatesFromTimeline), (date: string) => new Date(date).valueOf()), [timelines])
    // scales
    const xScale = scaleTime({
        range: [0, innerWidth],
        domain: xDomain,
    });


    const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [timelines.length, 0],
    });





    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    } = useTooltip<TimeEvent<EventKinds[number]> | TimeInterval<IntervalKinds[number]>>();

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        // TooltipInPortal is rendered in a separate child of <body /> and positioned
        // with page coordinates which should be updated on scroll. consider using
        // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
        scroll: true
    });





    if (width < 16) return null;
    return (
        <svg ref={containerRef} width={width} height={height}>
            <rect width={width} height={width} fill={'green'} rx={0} />

            <Group top={margin.top} left={margin.left}>
                <GridRows
                    key={`gridrows`}
                    scale={yScale}
                    stroke={GRID_COLOR}
                    width={innerWidth}
                    numTicks={timelines.length}
                />
                <GridColumns
                    key={`gridcolumns`}
                    scale={xScale}
                    stroke={GRID_COLOR}
                    height={innerHeight}
                />
                {timelines.map(({ events: timelineEvents, intervals: timelineIntervals }, timelineIdx) => {


                    return (<Group key={`timeline-${timelineIdx}`}>

                        {timelineIntervals.map((timelineInterval, timelineIntervalIdx) => (
                            <Bar
                                key={`timeline-interval-${timelineIdx}-${timelineIntervalIdx}`}
                                x={xScale(new Date(timelineInterval.start))}
                                y={yScale(timelineIdx) - 0.5 * Math.abs(yScale(1) - yScale(0)) / 5}
                                width={xScale(new Date(timelineInterval.end)) - xScale(new Date(timelineInterval.start))}
                                height={Math.abs(yScale(1) - yScale(0)) / 5}
                                fill={'#EDADE3'}
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
                                    const tooltipLeft = xScale(new Date(timelineInterval.start)) + 0.5 * (xScale(new Date(timelineInterval.end)) - xScale(new Date(timelineInterval.start)));
                                    showTooltip({
                                        tooltipData: timelineInterval,
                                        tooltipTop: eventSvgCoords?.y,
                                        tooltipLeft
                                    });
                                }}

                            />
                        ))}
                        {timelineEvents.map((timelineEvent, timelineEventIdx) => (
                            <GlyphCircle key={`timeline-event-${timelineIdx}-${timelineEventIdx}`}
                                left={xScale(new Date(timelineEvent.date))}
                                top={yScale(timelineIdx)}
                                fill={'red'}
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
                                    const tooltipLeft = xScale(new Date(timelineEvent.date));
                                    showTooltip({
                                        tooltipData: timelineEvent,
                                        tooltipTop: eventSvgCoords?.y,
                                        tooltipLeft
                                    });
                                }}
                            />))}

                    </Group>)
                })}

                <AxisBottom
                    hideAxisLine={true}
                    top={innerHeight}
                    scale={xScale}
                    stroke={purple3}
                    tickStroke={purple3}
                    tickLabelProps={{
                        fill: purple3,
                        fontSize: 11,
                        textAnchor: 'middle',
                    }}
                />
                <AxisLeft
                    hideAxisLine={true}
                    scale={yScale}
                    numTicks={timelines.length}
                    stroke={purple3}
                    tickStroke={purple3}
                    tickLabelProps={{
                        fill: purple3,
                        fontSize: 11,
                        textAnchor: 'end',
                        dy: '0.33em',
                    }}
                />
            </Group>
            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                >
                    <div style={{ color: "whitesmoke" }}>
                    </div>
                    <div>{tooltipData.description}</div>
                </TooltipInPortal>
            )}
        </svg>
    );
}


// Define the interval kinds and event kinds
enum IntervalKind {
    Project = 'project',
    Meeting = 'meeting',
    Vacation = 'vacation',
}

enum EventKind {
    Deadline = 'deadline',
    TaskCompleted = 'task-completed',
}



// Define an array of timelines
const timelines: Timelines<IntervalKind, EventKind, [IntervalKind.Project, IntervalKind.Meeting], [EventKind.Deadline, EventKind.TaskCompleted]> = [
    {
        intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
        eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
        intervals: [

            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-02-08',
                end: '2022-03-31',
            },
            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-04-08',
                end: '2022-08-31',
            },
            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-09-08',
                end: '2022-09-31',
            },
        ],
        events: [

            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2022-03-01',
            },
            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2022-08-01',
            },
            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2022-12-01',
            },
            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2023-01-01',
            },
        ],
    },
    {
        intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
        eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
        intervals: [

            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-02-01',
                end: '2022-02-31',
            },
            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-09-01',
                end: '2022-11-31',
            },
        ],
        events: [

            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2022-03-01',
            },
        ],
    },
    {
        intervalKinds: [IntervalKind.Project, IntervalKind.Meeting],
        eventKinds: [EventKind.Deadline, EventKind.TaskCompleted],
        intervals: [

            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-02-01',
                end: '2022-04-31',
            },
            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-08-01',
                end: '2022-06-31',
            },
            {
                tag: 'time-inteveral',
                kind: IntervalKind.Meeting,
                description: 'Weekly Meeting',
                start: '2022-10-01',
                end: '2022-11-31',
            },
        ],
        events: [
            {
                tag: 'time-event',
                kind: EventKind.Deadline,
                description: 'Deadline for Project A',
                date: '2022-01-31',
            },
            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 1 Completed',
                date: '2022-02-15',
            },
            {
                tag: 'time-event',
                kind: EventKind.TaskCompleted,
                description: 'Task 2 Completed',
                date: '2022-03-01',
            },
        ],
    },
];


const ResponsiveTimeline = () => (<ParentSize>
    {({ width, height }) => (
        <TimelineImpl<IntervalKind, EventKind, [IntervalKind.Project, IntervalKind.Meeting], [EventKind.Deadline, EventKind.TaskCompleted]>
            width={width}
            height={height}
            margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
            timelines={timelines}
        />
    )}
</ParentSize>)


export { ResponsiveTimeline };
