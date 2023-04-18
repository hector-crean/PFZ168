import styles from "./page.module.scss";
import { Block, Blocks } from "@/components/Block";
import { ResponsiveAnnotatedChart } from "@/components/charts-2D/annotated/Example";

const Page = () => {
	return (
		<Blocks as='section'>
			<Block as='ul' fullBleed={false}>
				<p> Dosing Schedule content </p>
			</Block>
		</Blocks>
	);
};

export default Page;
