"use client";

import "./globals.scss";

import styles from "./layout.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const RootLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	return (
		<html lang="en">
			<body>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						className={styles.page_transition_wrapper}
						initial={{ x: 300, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 300, opacity: 0 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
						}}
					>
						<div key={pathname} className={styles.page_transition_wrapper}>
							{children}
						</div>
					</motion.div>
				</AnimatePresence>
			</body>
		</html>
	);
};

export default RootLayout;
