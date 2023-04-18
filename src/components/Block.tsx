"use client";
import { ComponentType, ElementType, ReactNode, useRef } from "react";
import styles from "./block.module.scss";
import { useInView, useSpring, motion, useScroll } from "framer-motion";

type BlocksProps<T extends ElementType> = React.ComponentPropsWithoutRef<T> & {
	as: T;
	children: ReactNode;
};

const Blocks = <T extends ElementType>({
	as,
	children,
	...rest
}: BlocksProps<T>) => {
	const Element: ElementType = as;

	const ref = useRef<HTMLElement>(null);
	// const { scrollYProgress } = useScroll({
	// 	target: ref,
	// 	layoutEffect: false,
	// 	offset: ["end end", "start start"],
	// });
	// const scaleX = useSpring(scrollYProgress, {
	// 	stiffness: 100,
	// 	damping: 30,
	// 	restDelta: 0.001,
	// });

	return (
		<Element ref={ref} className={styles.blocks} {...rest}>
			{/* <motion.div className={styles.progress_bar} style={{ scaleX }} /> */}

			{children}
		</Element>
	);
};

type BlockProp<T extends ElementType> = React.ComponentPropsWithoutRef<T> & {
	as: T;
	children: ReactNode;
	fullscreenHeight?: boolean;
	fullBleed?: boolean;
};

const Block = <T extends ElementType>({
	as,
	children,
	fullBleed = false,
	fullscreenHeight = false,
	...rest
}: BlockProp<T>) => {
	const Element: ElementType = as;

	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });

	return (
		<Element
			ref={ref}
			data-full-bleed={fullBleed}
			data-fullscreen-height={fullscreenHeight}
			className={`${styles.block}`}
			style={{
				opacity: isInView ? 1 : 0,
				transition: "opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
			{...rest}
		>
			{children}
		</Element>
	);
};

export { Blocks, Block };
