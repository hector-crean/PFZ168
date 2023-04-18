"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveRaincloudPlot } from "@/components/charts-2D/RaincloudChart";
import { ResponsiveBarChart } from "@/components/charts-2D/xy-chart-v2/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>Objective Response Rate per BICR Across Subgroups</Block>
			<Block as='ul'>
				<li>High-risk cytogenetics</li>
				<li>Extensive marrow involvement</li>
				<li>{">"}5 lines of prior therapy</li>
				<li>Advanced age</li>
			</Block>
			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveRaincloudPlot />
			</Block>
		</Blocks>
	);
};

export default Page;
