import Link from "next/link";

import styles from "./Header.module.scss";

export const Header = () => {
	return (
		<div className={styles.header}>
			<Link href="/">Home</Link>
		</div>
	);
};
