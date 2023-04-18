"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";
import { ResponsiveSankeyChart } from "@/components/charts-2D/graphs/Sankey";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>
				CRS profile, patients received 12/32 step-up regimen (n=119)
			</Block>
			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveSankeyChart />
			</Block>
		</Blocks>
	);
};

export default Page;
