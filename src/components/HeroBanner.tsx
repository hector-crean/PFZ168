"use client";
import { ReactNode, useState } from "react";
import styles from "./hero-banner.module.scss";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
	heading: ReactNode;
	description: ReactNode;
	src: string;
}
const HeroBanner = ({ src, description, heading }: Props) => {
	return (
		<div className={styles.hero_banner}>
			<AnimatePresence>
				<motion.img
					className={styles.hero_image}
					key={src}
					src={src}
					alt='hero-image'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
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
};

export { HeroBanner };
