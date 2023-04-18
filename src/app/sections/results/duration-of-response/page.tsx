"use client";
import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";
import { ResponsiveBarChart } from "@/components/charts-2D/xy-chart-v2/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='h1'>Duration of Response per BICR (Responders Only)</Block>
			<Block as='ul' fullBleed={false}>
				<li>
					This Kaplan-Meier curve demonstrates the duration of response to
					Elranatamab
				</li>
				<li>
					The time from achievement of response to progression is plotted for
					all patients
				</li>
				<li>
					The median time to response was 1.2 months (range, 0.9−7.4), with
					responses deepening over time
				</li>
			</Block>
			<Block as='div' fullBleed={true} style={{ height: "60vh" }}>
				<ResponsiveBarChart />
			</Block>
		</Blocks>
	);
};

export default Page;
