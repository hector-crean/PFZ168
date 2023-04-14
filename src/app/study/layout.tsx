"use client";

import styles from "./layout.module.scss";
import { Sidebar } from "@/layouts/Sidebar";
import { Header } from "@/layouts/Header";
import { tree } from "@/routes";
import { usePathname } from "next/navigation";

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	const pathname = usePathname();

	return (
		<>
			<header className={styles.header}>
				<Header />
			</header>
			<div className={styles.main}>
				<aside className={styles.sidebar}>
					<Sidebar routes={tree} activePathname={pathname} />
				</aside>
				<div className={styles.content}>
					{/* {title && <h1>{title}</h1>} */}

					{children}
				</div>
			</div>
		</>
	);
};

export default Layout;
