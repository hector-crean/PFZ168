import {
	AggregatedPatientTimeline
} from "@/models/patient";

import { ParentSize } from "@/lib/visx-responsive";
import CustomChartBackground from "./CustomChartBackground";
import { ExampleControls } from "./ExampleControls";

function convertToSentenceCase(str: string): string {
	// Convert the string to lower case and split into words
	const words = str.replace(/([A-Z])/g, " $1").toLowerCase().split(/[\s_-]+/);

	// Capitalize the first letter of each word and join them with spaces
	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const data: AggregatedPatientTimeline[] = [
	{
		time: 0,
		activeResponsePercentage: 94.8745431266014,
		progressionFreeSurvivalPercentage: 98.15782085080504,
		overalSurvivalPercentage: 98.23071522171917,
	},
	{
		time: 1,
		activeResponsePercentage: 92.20492872226417,
		progressionFreeSurvivalPercentage: 97.04749678775174,
		overalSurvivalPercentage: 95.54665954697614,
	},
	{
		time: 2,
		activeResponsePercentage: 88.01382988532956,
		progressionFreeSurvivalPercentage: 96.45695523012071,
		overalSurvivalPercentage: 97.90631992995914,
	},
	{
		time: 3,
		activeResponsePercentage: 96.77297151769949,
		progressionFreeSurvivalPercentage: 92.22301439019016,
		overalSurvivalPercentage: 93.21329540865838,
	},
	{
		time: 4,
		activeResponsePercentage: 91.04533434806908,
		progressionFreeSurvivalPercentage: 95.52956607942988,
		overalSurvivalPercentage: 85.68221275943878,
	},
	{
		time: 5,
		activeResponsePercentage: 93.32826195847298,
		progressionFreeSurvivalPercentage: 92.58591837885056,
		overalSurvivalPercentage: 87.01021817718465,
	},
	{
		time: 6,
		activeResponsePercentage: 88.89585108398732,
		progressionFreeSurvivalPercentage: 91.13321590746172,
		overalSurvivalPercentage: 80.52283496384419,
	},
	{
		time: 7,
		activeResponsePercentage: 89.70259341282909,
		progressionFreeSurvivalPercentage: 92.8512383039018,
		overalSurvivalPercentage: 91.67256712172878,
	},
	{
		time: 8,
		activeResponsePercentage: 91.96892324674495,
		progressionFreeSurvivalPercentage: 91.57845746545688,
		overalSurvivalPercentage: 90.82211863108859,
	},
	{
		time: 9,
		activeResponsePercentage: 81.31369332938672,
		progressionFreeSurvivalPercentage: 87.66685981375619,
		overalSurvivalPercentage: 77.90167276055928,
	},
	{
		time: 10,
		activeResponsePercentage: 84.08025993658235,
		progressionFreeSurvivalPercentage: 89.13153624984346,
		overalSurvivalPercentage: 78.87459750656643,
	},
	{
		time: 11,
		activeResponsePercentage: 88.16372475795774,
		progressionFreeSurvivalPercentage: 87.39899064667553,
		overalSurvivalPercentage: 77.05403013173215,
	},
	{
		time: 12,
		activeResponsePercentage: 83.05382073797534,
		progressionFreeSurvivalPercentage: 83.93470549826631,
		overalSurvivalPercentage: 79.95681484420155,
	},
	{
		time: 13,
		activeResponsePercentage: 81.89107148881163,
		progressionFreeSurvivalPercentage: 82.30310035690604,
		overalSurvivalPercentage: 83.08795132163779,
	},
	{
		time: 14,
		activeResponsePercentage: 80.44613070891616,
		progressionFreeSurvivalPercentage: 83.97018442613552,
		overalSurvivalPercentage: 83.69189177699329,
	},
	{
		time: 15,
		activeResponsePercentage: 78.19314845473485,
		progressionFreeSurvivalPercentage: 81.2035558855347,
		overalSurvivalPercentage: 71.50907241188187,
	},
	{
		time: 16,
		activeResponsePercentage: 81.98784602497479,
		progressionFreeSurvivalPercentage: 82.54783616983927,
		overalSurvivalPercentage: 83.69287189024821,
	},
];

export type XYChartProps = {
	width: number;
	height: number;
};

const BarChart = ({ height }: XYChartProps) => {
	return (
		<ExampleControls
			data={data}
			features={[
				"time",
				"activeResponsePercentage",
				"progressionFreeSurvivalPercentage",
				"overalSurvivalPercentage",
			]}
			independentVariable={'time'}
			accessors={{
				time: (d) => d.time,
				activeResponsePercentage: (d) => d.activeResponsePercentage,
				progressionFreeSurvivalPercentage: (d) =>
					d.progressionFreeSurvivalPercentage,
				overalSurvivalPercentage: (d) => d.overalSurvivalPercentage,
			}}
		>
			{({
				features,
				independentVariable,
				accessors,
				animationTrajectory,
				annotationDataKey,
				annotationDatum,
				annotationLabelPosition,
				annotationType,
				colorAccessorFactory,
				config,
				curve,
				data,
				editAnnotationLabelPosition,
				numTicks,
				renderAreaSeries,
				renderAreaStack,
				renderBarGroup,
				renderBarSeries,
				renderBarStack,
				renderGlyph,
				renderGlyphSeries,
				enableTooltipGlyph,
				renderTooltipGlyph,
				renderHorizontally,
				renderLineSeries,
				setAnnotationDataIndex,
				setAnnotationDataKey,
				setAnnotationLabelPosition,
				sharedTooltip,
				showGridColumns,
				showGridRows,
				showHorizontalCrosshair,
				showTooltip,
				showVerticalCrosshair,
				snapTooltipToDatumX,
				snapTooltipToDatumY,
				stackOffset,
				theme,
				xAxisOrientation,
				yAxisOrientation,

				// components are animated or not depending on selection
				Annotation,
				AreaSeries,
				AreaStack,
				Axis,
				BarGroup,
				BarSeries,
				BarStack,
				GlyphSeries,
				Grid,
				LineSeries,
				AnnotationCircleSubject,
				AnnotationConnector,
				AnnotationLabel,
				AnnotationLineSubject,
				Tooltip,
				XYChart,
			}) => {
				return (
					<XYChart
						theme={theme}
						xScale={config.x}
						yScale={config.y}
						height={Math.min(400, height)}
						captureEvents={!editAnnotationLabelPosition}
						onPointerUp={(d) => {
							setAnnotationDataKey(d.key);
							setAnnotationDataIndex(d.index);
						}}
					>
						<CustomChartBackground />
						<Grid
							key={`grid-${animationTrajectory}`} // force animate on update
							rows={showGridRows}
							columns={showGridColumns}
							animationTrajectory={animationTrajectory}
							numTicks={numTicks}
						/>
						{renderBarStack && (
							<BarStack offset={stackOffset}>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<BarSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
									/>
								))}
							</BarStack>
						)}
						{renderBarGroup && (
							<BarGroup>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<BarSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
										colorAccessor={colorAccessorFactory(feature)}
									/>
								))}
							</BarGroup>
						)}

						{renderAreaSeries && (
							<>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<AreaSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
										fillOpacity={0.4}
										curve={curve}
									/>
								))}
							</>
						)}
						{renderAreaStack && (
							<AreaStack
								curve={curve}
								offset={stackOffset}
								renderLine={stackOffset !== "wiggle"}
							>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<AreaSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
										fillOpacity={0.4}
									/>
								))}
							</AreaStack>
						)}
						{renderLineSeries && (
							<>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<LineSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
										curve={curve}
									/>
								))}
							</>
						)}
						{renderGlyphSeries && (
							<>
								{features.filter(feature => feature !== independentVariable).map((feature) => (
									<GlyphSeries
										dataKey={feature}
										data={data}
										xAccessor={accessors["time"]}
										yAccessor={accessors[feature]}
										renderGlyph={renderGlyph}
										colorAccessor={colorAccessorFactory(feature)}
									/>
								))}
							</>
						)}
						<Axis
							key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
							orientation={
								renderHorizontally ? yAxisOrientation : xAxisOrientation
							}
							label={"Time (Months)"}
							numTicks={numTicks}
							animationTrajectory={animationTrajectory}
						/>
						<Axis
							key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
							label={
								stackOffset == null
									? "Percent (%)"
									: stackOffset === "expand"
										? "Percent (%)"
										: ""
							}
							orientation={
								renderHorizontally ? xAxisOrientation : yAxisOrientation
							}
							numTicks={numTicks}
							animationTrajectory={animationTrajectory}
							// values don't make sense in stream graph
							tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
						/>

						{showTooltip && (
							<Tooltip
								showHorizontalCrosshair={showHorizontalCrosshair}
								showVerticalCrosshair={showVerticalCrosshair}
								snapTooltipToDatumX={snapTooltipToDatumX}
								snapTooltipToDatumY={snapTooltipToDatumY}
								showDatumGlyph={
									(snapTooltipToDatumX || snapTooltipToDatumY) &&
									!renderBarGroup
								}
								showSeriesGlyphs={sharedTooltip && !renderBarGroup}
								renderGlyph={
									enableTooltipGlyph ? renderTooltipGlyph : undefined
								}
								renderTooltip={({ tooltipData, colorScale }) => (
									<>
										{/** date */}
										<p>
											{tooltipData?.nearestDatum?.datum && (
												<table>

													{Object.entries(accessors).filter(([k, _]) => k !== independentVariable).map(([key, accesorFn]) => (
														<tr>
															<th scope='col' style={{
																color: colorScale?.(key),
																textDecoration:
																	tooltipData?.nearestDatum?.key === key ? 'underline' : undefined,
															}}>{convertToSentenceCase(key)}</th>
															<td>
																{accesorFn(tooltipData?.nearestDatum?.datum).toFixed(1)}
															</td>
														</tr>
													))}
												</table>
											)}
										</p>
									</>
								)}
							/>
						)}
					</XYChart>
				);
			}}
		</ExampleControls>
	);
};

const ResponsiveBarChart = () => (
	<ParentSize>
		{({ width, height }) => <BarChart width={width} height={height} />}
	</ParentSize>
);

export { ResponsiveBarChart };
