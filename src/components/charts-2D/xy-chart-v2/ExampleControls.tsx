/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { curveCardinal, curveLinear, curveStep } from "@/lib/visx-curve";
import { GlyphCross, GlyphDot, GlyphStar } from "@/lib/visx-glyph";
import { PatternLines } from "@/lib/visx-pattern";
import { AnimationTrajectory } from "@/lib/visx-react-spring/types";
import { XYChartTheme, darkTheme } from "@/lib/visx-xychart";
import { RenderTooltipGlyphProps } from "@/lib/visx-xychart/components/Tooltip";
import { GlyphProps } from "@/lib/visx-xychart/types";
import React, { useCallback, useMemo, useState } from "react";
import getAnimatedOrUnanimatedComponents from "./getAnimatedOrUnanimatedComponents";
import userPrefersReducedMotion from "./userPrefersReducedMotion";

type ObjectKeysAsStrings<T> = Extract<keyof T, string>[];

const selectedDatumPatternId = "xychart-selected-datum";

type Accessor<Datum extends object> = (d: Datum) => number | string;

type Accessors<Datum extends object> = { [K in keyof Datum]: Accessor<Datum> };

type DataKey<Datum extends object> = keyof Accessors<Datum>;

type SimpleScaleConfig = { type: "band" | "linear"; paddingInner?: number };

type ProvidedProps<Datum extends object> = {
	accessors: Accessors<Datum>;
	features: ObjectKeysAsStrings<Datum>;
	independentVariable: keyof Datum;
	animationTrajectory?: AnimationTrajectory;
	annotationDataKey: DataKey<Datum> | null;
	annotationDatum?: Datum;
	annotationLabelPosition: { dx: number; dy: number };
	annotationType?: "line" | "circle";
	colorAccessorFactory: (key: DataKey<Datum>) => (d: Datum) => string | null;
	config: {
		x: SimpleScaleConfig;
		y: SimpleScaleConfig;
	};
	curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
	data: Datum[];
	editAnnotationLabelPosition: boolean;
	numTicks: number;
	setAnnotationDataIndex: (index: number) => void;
	setAnnotationDataKey: (key: DataKey<Datum> | null) => void;
	setAnnotationLabelPosition: (position: { dx: number; dy: number }) => void;
	renderAreaSeries: boolean;
	renderAreaStack: boolean;
	renderBarGroup: boolean;
	renderBarSeries: boolean;
	renderBarStack: boolean;
	renderGlyph: React.FC<GlyphProps<Datum>>;
	renderGlyphSeries: boolean;
	enableTooltipGlyph: boolean;
	renderTooltipGlyph: React.FC<RenderTooltipGlyphProps<Datum>>;
	renderHorizontally: boolean;
	renderLineSeries: boolean;
	sharedTooltip: boolean;
	showGridColumns: boolean;
	showGridRows: boolean;
	showHorizontalCrosshair: boolean;
	showTooltip: boolean;
	showVerticalCrosshair: boolean;
	snapTooltipToDatumX: boolean;
	snapTooltipToDatumY: boolean;
	stackOffset?: "wiggle" | "expand" | "diverging" | "silhouette";
	theme: XYChartTheme;
	xAxisOrientation: "top" | "bottom";
	yAxisOrientation: "left" | "right";
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;

type ControlsProps<Datum extends object> = {
	features: ObjectKeysAsStrings<Datum>;
	independentVariable: keyof Datum;
	data: Array<Datum>;
	accessors: Accessors<Datum>;
	children: (props: ProvidedProps<Datum>) => React.ReactNode;
};

const ExampleControls = <Datum extends object>({
	features,
	independentVariable,
	accessors,
	data,
	children,
}: ControlsProps<Datum>) => {
	const [useAnimatedComponents, setUseAnimatedComponents] = useState(
		!userPrefersReducedMotion(),
	);
	const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
	const [animationTrajectory, setAnimationTrajectory] = useState<
		AnimationTrajectory | undefined
	>("center");
	const [gridProps, setGridProps] = useState<[boolean, boolean]>([
		false,
		false,
	]);
	const [showGridRows, showGridColumns] = gridProps;
	const [xAxisOrientation, setXAxisOrientation] = useState<"top" | "bottom">(
		"bottom",
	);
	const [yAxisOrientation, setYAxisOrientation] = useState<"left" | "right">(
		"left",
	);
	const [renderHorizontally, setRenderHorizontally] = useState(false);
	const [showTooltip, setShowTooltip] = useState(true);
	const [annotationDataKey, setAnnotationDataKey] =
		useState<ProvidedProps<Datum>["annotationDataKey"]>(null);
	const [annotationType, setAnnotationType] =
		useState<ProvidedProps<Datum>["annotationType"]>("circle");
	const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true);
	const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false);
	const [snapTooltipToDatumX, setSnapTooltipToDatumX] = useState(true);
	const [snapTooltipToDatumY, setSnapTooltipToDatumY] = useState(true);
	const [sharedTooltip, setSharedTooltip] = useState(true);
	const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<
		"bar" | "barstack" | "bargroup" | "none"
	>("none");
	const [renderAreaLineOrStack, setRenderAreaLineOrStack] = useState<
		"line" | "area" | "areastack" | "none"
	>("line");
	const [stackOffset, setStackOffset] =
		useState<ProvidedProps<Datum>["stackOffset"]>();
	const [renderGlyphSeries, setRenderGlyphSeries] = useState(false);
	const [editAnnotationLabelPosition, setEditAnnotationLabelPosition] =
		useState(false);
	const [annotationLabelPosition, setAnnotationLabelPosition] = useState({
		dx: -40,
		dy: -20,
	});
	const [annotationDataIndex, setAnnotationDataIndex] = useState(0);
	const [negativeValues, setNegativeValues] = useState(false);
	const [fewerDatum, setFewerDatum] = useState(false);
	const [missingValues, setMissingValues] = useState(false);
	const [glyphComponent, setGlyphComponent] = useState<
		"star" | "cross" | "circle" | "🍍"
	>("star");
	const [curveType, setCurveType] = useState<"linear" | "cardinal" | "step">(
		"linear",
	);
	const glyphOutline = theme.gridStyles.stroke;
	const renderGlyph = useCallback(
		({
			size,
			color,
			onPointerMove,
			onPointerOut,
			onPointerUp,
		}: GlyphProps<Datum>) => {
			const handlers = { onPointerMove, onPointerOut, onPointerUp };
			if (glyphComponent === "star") {
				return (
					<GlyphStar
						stroke={glyphOutline}
						fill={color}
						size={size * 10}
						{...handlers}
					/>
				);
			}
			if (glyphComponent === "circle") {
				return (
					<GlyphDot
						stroke={glyphOutline}
						fill={color}
						r={size / 2}
						{...handlers}
					/>
				);
			}
			if (glyphComponent === "cross") {
				return (
					<GlyphCross
						stroke={glyphOutline}
						fill={color}
						size={size * 10}
						{...handlers}
					/>
				);
			}
			return (
				<text dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
					🍍
				</text>
			);
		},
		[glyphComponent, glyphOutline],
	);
	const [enableTooltipGlyph, setEnableTooltipGlyph] = useState(false);
	const [tooltipGlyphComponent, setTooltipGlyphComponent] = useState<
		"star" | "cross" | "circle" | "🍍"
	>("star");
	const renderTooltipGlyph = useCallback(
		({
			x,
			y,
			size,
			color,
			onPointerMove,
			onPointerOut,
			onPointerUp,
			isNearestDatum,
		}: RenderTooltipGlyphProps<Datum>) => {
			const handlers = { onPointerMove, onPointerOut, onPointerUp };
			if (tooltipGlyphComponent === "star") {
				return (
					<GlyphStar
						left={x}
						top={y}
						stroke={glyphOutline}
						fill={color}
						size={size * 10}
						{...handlers}
					/>
				);
			}
			if (tooltipGlyphComponent === "circle") {
				return (
					<GlyphDot
						left={x}
						top={y}
						stroke={glyphOutline}
						fill={color}
						r={size}
						{...handlers}
					/>
				);
			}
			if (tooltipGlyphComponent === "cross") {
				return (
					<GlyphCross
						left={x}
						top={y}
						stroke={glyphOutline}
						fill={color}
						size={size * 10}
						{...handlers}
					/>
				);
			}
			return (
				<text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
					{isNearestDatum ? "🍍" : "🍌"}
				</text>
			);
		},
		[tooltipGlyphComponent, glyphOutline],
	);
	// for series that support it, return a colorAccessor which returns a custom color if the datum is selected
	const colorAccessorFactory = useCallback(
		(dataKey: DataKey<Datum>) => (d: Datum) =>
			annotationDataKey === dataKey && d === data[annotationDataIndex]
				? `url(#${selectedDatumPatternId})`
				: null,
		[annotationDataIndex, annotationDataKey],
	);

	const accessorsMemo = useMemo(
		() => ({ ...accessors }),
		[renderHorizontally, negativeValues],
	);

	const config: { x: SimpleScaleConfig; y: SimpleScaleConfig } = useMemo(
		() => ({
			x: renderHorizontally ? { type: "linear" } : { type: "linear" },
			y: renderHorizontally ? { type: "linear" } : { type: "linear" },
		}),
		[renderHorizontally],
	);

	// cannot snap to a stack position
	const canSnapTooltipToDatum =
		renderBarStackOrGroup !== "barstack" &&
		renderAreaLineOrStack !== "areastack";

	return (
		<>
			{children({
				accessors: accessorsMemo,
				features,
				independentVariable,
				animationTrajectory,
				annotationDataKey,
				annotationDatum: data[annotationDataIndex],
				annotationLabelPosition,
				annotationType,
				colorAccessorFactory,
				config,
				curve:
					(curveType === "cardinal" && curveCardinal) ||
					(curveType === "step" && curveStep) ||
					curveLinear,
				data: data,
				editAnnotationLabelPosition,
				numTicks: 20,
				renderBarGroup: renderBarStackOrGroup === "bargroup",
				renderBarSeries: renderBarStackOrGroup === "bar",
				renderBarStack: renderBarStackOrGroup === "barstack",
				renderGlyphSeries,
				renderGlyph,
				enableTooltipGlyph,
				renderTooltipGlyph,
				renderHorizontally,
				renderAreaSeries: renderAreaLineOrStack === "area",
				renderAreaStack: renderAreaLineOrStack === "areastack",
				renderLineSeries: renderAreaLineOrStack === "line",
				setAnnotationDataIndex,
				setAnnotationDataKey,
				setAnnotationLabelPosition,
				sharedTooltip,
				showGridColumns,
				showGridRows,
				showHorizontalCrosshair,
				showTooltip,
				showVerticalCrosshair,
				snapTooltipToDatumX: canSnapTooltipToDatum && snapTooltipToDatumX,
				snapTooltipToDatumY: canSnapTooltipToDatum && snapTooltipToDatumY,
				stackOffset,
				theme,
				xAxisOrientation,
				yAxisOrientation,
				...getAnimatedOrUnanimatedComponents(useAnimatedComponents),
			})}
			{/** This style is used for annotated elements via colorAccessor. */}
			<svg className="pattern-lines">
				<PatternLines
					id={selectedDatumPatternId}
					width={6}
					height={6}
					orientation={["diagonalRightToLeft"]}
					stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
					strokeWidth={1.5}
				/>
			</svg>

			<style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
		</>
	);
};

export { ExampleControls };
