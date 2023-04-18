import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='ul' fullBleed={false}>
				<ul>
					<li>
						MagnetisMM-3 is an open-label, multicenter, non-randomized, phase 2
						study
					</li>
					<li>
						MagnetisMM-3 enrolled a heavily pre-treated population reflective of
						real-world patients with RRMM with and without prior BCMA-targeted
						therapy
					</li>
				</ul>
			</Block>
		</Blocks>
	);
};

export default Page;
