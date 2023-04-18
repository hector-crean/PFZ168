"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveBarChart } from "@/components/charts-2D/xy-chart-v2/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>Overall Survival</Block>
			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveBarChart />
			</Block>
		</Blocks>
	);
};

export default Page;
