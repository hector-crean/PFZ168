import { ReactNode } from "react";
import styles from "./layout.module.scss";

interface LayoutProps {
	children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
	return <div className={styles.container}>{children}</div>;
};

export default Layout;
