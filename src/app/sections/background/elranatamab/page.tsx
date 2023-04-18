import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='ul' fullBleed={false}>
				<ul>
					<li>Elranatamab (PF-06863135) is a humanized bispecific antibody1</li>
					<li>
						Elranatamab binds BCMA on MM cells and CD3 on T cells, activating T
						cells independent of the MHC I1
					</li>
					<li>
						BCMA is a transmembrane protein, whose expression is a hallmark of
						myeloma cells and an ideal target for the treatment of MM
						<sup>2,3</sup>
					</li>
					<li>
						Data from the ongoing phase 1 MagnetisMM-1 study (NCT03269136)
						demonstrated the safety and efficacy of Elranatamab in patients with
						RRMM4-7
					</li>
					<li>
						Here we present results from the phase 2 MagnetisMM-3 (NCT04649359)
						study in patients with RRMM and no prior BCMA-targeted treatment
					</li>
				</ul>
			</Block>
		</Blocks>
	);
};

export default Page;
