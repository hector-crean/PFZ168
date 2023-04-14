import Link from "next/link";

import { type Tree } from "../models/tree";
import React from "react";

import styles from "./Sidebar.module.scss";
import { FsTree } from "@/components/folder-tree/FolderTree";

export const Sidebar = ({
	routes,
	activePathname,
}: { routes: Tree; activePathname: string }) => {
	return (
		<div className={styles.pages}>
			<FsTree branches={routes} activePathname={activePathname} />
		</div>
	);
};
