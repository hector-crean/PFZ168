"use client";

import { Header } from "@/components/Header";
import { tree } from '@/routes';
import { usePathname } from "next/navigation";
import styles from "./layout.module.scss";

interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	const pathname = usePathname();

	return (
		<>
			<Header activePathname={pathname} nodes={tree} />
			<div className={styles.main}>

				<div className={styles.content}>
					{/* {title && <h1>{title}</h1>} */}

					{children}
				</div>
			</div>
		</>
	);
};

export default Layout;
