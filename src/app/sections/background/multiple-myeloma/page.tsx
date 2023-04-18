"use client";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from '@/components/charts-2D/annotated/Example';

const Page = () => {
	return (
		<Blocks as='section' >
			<Block as='ul' fullBleed={false}>
				<li>Multiple myeloma is a largely incurable disease, characterized by periods of response, followed by relapse and/or refractoriness to therapy</li>
				<li>Patients with relapsed/refractory multiple myeloma (RRMM) often have a sustained response to front-line therapy for several years, followed by loss of response and disease progression<sup>1</sup></li>
				<li>Response to subsequent therapy is often not as deep or sustained, as therapy-resistant clones emerge over time<sup>2-4</sup></li>
				<li>The refractory nature of RRMM necessitates novel treatment approaches</li>
			</Block>
			<Block as='div' fullBleed={true} style={{ width: "100%", height: "60vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
				<ResponsiveAnnotatedChart />
			</Block>

		</Blocks>
	);
};

export default Page;
