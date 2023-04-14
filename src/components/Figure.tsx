import { ElementType, ReactNode } from "react";
import styles from "./figure.module.scss";

type FigureProps = React.ComponentPropsWithoutRef<"figure"> & {
	media: ReactNode;
	caption: ReactNode;
	heading?: ReactNode;
};

const Figure = ({ media, caption, heading, ...rest }: FigureProps) => {
	return (
		<figure className={styles.figure} {...rest}>
			<div>{heading}</div>
			{media}
			<figcaption>{caption}</figcaption>
		</figure>
	);
};

export { Figure };
