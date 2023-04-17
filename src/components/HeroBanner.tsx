"use client";
import { ReactNode, Ref, forwardRef } from "react";
import styles from "./hero-banner.module.scss";

import { AnimatePresence, MotionProps, motion } from "framer-motion";

interface Props extends MotionProps {
	heading: ReactNode;
	description: ReactNode;
	src: string;
}

const HeroBanner = forwardRef<HTMLDivElement, Props>(
	({ src, description, heading, ...rest }, ref: Ref<HTMLDivElement>) => {
		return (
			<div className={styles.hero_banner} ref={ref}>
				<AnimatePresence>
					<motion.img
						className={styles.hero_image}
						key={src}
						src={src}
						alt="hero-image"

						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						{...rest}
					/>
				</AnimatePresence>
				<div className={styles.hero_content}>
					<div className={styles.heading}>{heading}</div>
					<div className={styles.description}>
						<p>{description}</p>
					</div>
				</div>
			</div>
		);
	}
);

HeroBanner.displayName = 'HeroBanner'



export { HeroBanner };
