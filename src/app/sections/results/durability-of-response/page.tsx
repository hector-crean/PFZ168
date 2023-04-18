"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveTimeline } from "@/components/charts-2D/timeline/impl/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>Durability of Response per BICR (Responders Only)</Block>
			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveTimeline />
			</Block>
		</Blocks>
	);
};

export default Page;
