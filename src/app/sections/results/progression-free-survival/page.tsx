"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";
import { ResponsiveTimeline } from "@/components/charts-2D/timeline/impl/Example";
import { ResponsiveBarChart } from "@/components/charts-2D/xy-chart-v2/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>Progression Free Survival</Block>
			<Block as='ul'>
				<li>
					A steep decline in the percentage of patients achieving
					progression-free survival is observed in the first month, before
					plateauing
				</li>
			</Block>

			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveBarChart />
			</Block>
		</Blocks>
	);
};

export default Page;
