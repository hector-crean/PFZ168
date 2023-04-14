"use client";

import { DatumMap, Rank } from "@/context/chart-set.types";
import { Axis, AxisLeft } from "@/lib/visx-axis";
import { RectClipPath } from "@/lib/visx-clip-path";
import { localPoint } from "@/lib/visx-event";
import { GridColumns } from "@/lib/visx-grid";
import { ParentSize } from "@/lib/visx-responsive";
import { scaleLinear } from "@/lib/visx-scale";
import { Zoom } from "@/lib/visx-zoom";
import { max, min } from "d3-array";
import { ScaleLinear } from "d3-scale";
import { Fragment, useMemo, useState } from "react";
import type { Margin, Mat3 } from "../types";

type Props = {
	margin: Margin;
	bg: string;
	dataset: Array<DatumMap[Rank.one]>;
};

const LineChart = ({
	width,
	height,
	margin,
	bg,
	dataset,
}: Props & { width: number; height: number }) => {
	const initialTransform: Mat3 = {
		scaleX: 1.27,
		scaleY: 1.27,
		translateX: -211.62,
		translateY: 162.59,
		skewX: 0,
		skewY: 0,
	};
	const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const minimumX1 = min(dataset, (d) => d.x1)!;
	const maximumX1 = max(dataset, (d) => d.x1)!;
	const minimumY = min(dataset, (d) => d.y)!;
	const maximumY = max(dataset, (d) => d.y)!;

	const xScaleFn = useMemo(
		() =>
			scaleLinear({
				domain: [minimumX1, maximumX1],
				range: [margin.left, width - margin.right],
			}),
		[width, maximumX1, minimumX1, margin.left, margin.right],
	);

	const yScaleFn = useMemo(
		() =>
			scaleLinear({
				domain: [minimumY, maximumY],
				range: [height - margin.bottom, margin.top],
			}),
		[height, maximumY, minimumY, margin.top, margin.bottom],
	);

	const rescaleYAxis = (
		scale: ScaleLinear<number, number, never>,
		zoom: Mat3,
	) => {
		let newDomain = scale.range().map((r) => {
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

	const x = (d: DatumMap[Rank.one]) => d.x1;
	const y = (d: DatumMap[Rank.one]) => d.y;

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
			// wheelDelta={(event) => event.deltaY < 0 ? { k: 1.1 } : { k: 1 / 1.1 }}
			>
				{(zoom) => {
					console.log(zoom.transformMatrix.scaleX);

					return (
						<div className="relative">
							<svg
								width={width}
								height={height}
								style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
							>
								<RectClipPath id="zoom-clip" width={width} height={height} />
								<rect width={width} height={height} rx={0} fill={bg} />
								<g transform={zoom.toString()}>
									{dataset.map((datum, i) => (
										<Fragment key={`dot-${i}`}>
											<circle
												key={i}
												cx={xScaleFn(x(datum))}
												cy={yScaleFn(y(datum))}
												r={2}
												fill={"red"}
											/>
										</Fragment>
									))}
								</g>
								<GridColumns
									top={margin.top}
									scale={rescaleXAxis(xScaleFn, zoom.transformMatrix)}
									height={innerHeight}
									strokeOpacity={0.3}
									pointerEvents='none'
								/>
								<AxisLeft
									scale={rescaleYAxis(yScaleFn, zoom.transformMatrix)}
									left={margin.left}
									label='Life expectancy'
								/>

								<Axis
									orientation='bottom'
									scale={rescaleXAxis(xScaleFn, zoom.transformMatrix)}
									top={innerHeight + margin.top}
									// tickFormat={format("$~s")}
									// numTicks={2}
									label='patient number'
								/>
								<rect
									width={width}
									height={height}
									rx={14}
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
								{showMiniMap && (
									<g
										clipPath="url(#zoom-clip)"
										transform={`scale(0.25) translate(${width * 4 - width - 60
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
					);
				}}
			</Zoom>
			<style jsx>{`
     
        .relative {
          position: relative;
        }
      `}</style>
		</>
	);
};

const ResponsiveLineChart = (props: Props) => (
	<ParentSize>
		{({ width, height, top, left, ref, resize }) => (
			<LineChart width={width} height={height} {...props} />
		)}
	</ParentSize>
);

export { LineChart, ResponsiveLineChart };
