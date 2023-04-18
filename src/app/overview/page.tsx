"use client";
import { Slideshow } from "@/components/Slideshow";
import { ResponsiveRaincloudPlot } from "@/components/charts-2D/RaincloudChart";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";
import { ResponsiveSankeyChart } from "@/components/charts-2D/graphs/Sankey";
import { ResponsiveTimeline } from "@/components/charts-2D/timeline/impl/Example";
import { ResponsiveBarChart } from "@/components/charts-2D/xy-chart-v2/Example";
//import styles from "./page.module.scss";


const Page = () => {
	return (
		<>
			<Slideshow
				medias={[
					{
						media: (
							<div style={{ width: "60vw", height: "60vh" }}>
								<ResponsiveTimeline />
							</div>

						),
						title: <p><strong>Gant Chart</strong></p>,
						description: <div>
							<p><em>Data not accurate (for illustrative purposes only)</em></p>

						</div>,
					},

					{
						media: (
							<div style={{ width: "60vw", height: "60vh" }}>
								<ResponsiveBarChart />
							</div>
						),
						title: <p><strong>Line Chart</strong></p>,
						description: <div>
							<p><em>Data not accurate (for illustrative purposes only)</em></p>
							<ul>
								Relevant for:
								<li>Duraction of Response per BICR</li>
								<li>Progression-Free survival per BICR</li>
								<li>Overall survival</li>
							</ul>
						</div>,
					},
					{
						media: (
							<div style={{ width: "60vw", height: "60vh" }}>
								<ResponsiveSankeyChart />
							</div>
						),
						title: (
							<p>
								<strong>Sankey Diagram</strong>: <em>CRS profile, patients received 12/32 step-up regimen (n=119)</em>
							</p>
						),
						description: <div>
							<p><em>Data not accurate (for illustrative purposes only)</em></p>

						</div>,
					},
					{
						media: (
							<div style={{ width: "60vw", height: "60vh" }}>
								<ResponsiveRaincloudPlot />
							</div>
						),
						title: <p><strong>Box/Violin/Raincloud Plot</strong></p>,
						description: (<div>
							<p><em>Data not accurate (for illustrative purposes only)</em></p>
							<p>Relevant for: <em>Objective Response Rate per BICR Across Subgroups</em></p>
							<p>Currently data allows us to create boxplots. Depending on final form of data could extend with violin plot / raincloud plot to show distribution of feature more clearly</p>
						</div>),
					},


					{
						media: (
							<div style={{ width: "60vw", height: "60vh" }}>
								<ResponsiveAnnotatedChart />
							</div>
						),
						title: <p><strong>Annotations</strong> </p>,
						description: (
							<ul>
								<ul>We can add dynamic annotations to the charts, which show up when a particular area is clicked / hovered over</ul>
							</ul>
						),
					},
				]}
			/>
		</>
	);
};



export default Page;
