"use client";

import { ReactNode, useState, MouseEventHandler } from "react";
import styles from "./FolderTree.module.scss";
// import type { File, Folder, Node } from "./types";
import type { Leaf, Branch, Node } from "../../models/tree";
import { withRouter, NextRouter } from "next/router";
import Link from "next/link";
import { CSSProperties } from "react";
/// types :

/// Declarative file tree API :
type CollapsibleProps = {
	children: ReactNode;
	isOpen: boolean;
	isActive: boolean;
};

const Collapsible = ({ children, isOpen, isActive }: CollapsibleProps) => (
	<div
		className={styles.collapsible}
		data-is-open={isOpen}
		data-is-active={isActive}
	>
		{children}
	</div>
);

type FileProps = {
	name: string;
	path: string;
	depth: number;
	activePathname: string;
};
const File = ({ name, path, depth, activePathname }: FileProps) => {
	const isActive = activePathname === path;

	return (
		<Link href={path} passHref>
			<div className={styles.file} data-is-active={isActive} data-depth={depth}>
				<span className={styles.fileLabel} data-depth={depth}>
					{name}
				</span>
			</div>
		</Link>
	);
};

type FolderProps = {
	name: string;
	path: string;
	depth: number;
	baseColor: { h: `${number}deg`; s: `${number}%`; l: `${number}%` };
	disabled?: boolean;
	children: Array<ReactNode>;
	activePathname: string;
};
const Folder = ({
	name,
	path,
	depth,
	baseColor,
	disabled = false,
	children,
	activePathname,
}: FolderProps) => {
	const isActive = activePathname.includes(path);

	const [isOpen, setIsOpen] = useState(isActive);

	const handleToggle: MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.folder} data-depth={depth}>
			<div
				className={styles.folderLabel}
				onPointerDown={handleToggle}
				data-is-active={isActive}
				data-depth={depth}
				style={
					{
						"--base-color": `hsl(${baseColor.h},${baseColor.s},${baseColor.l})`,
					} as CSSProperties
				}
			>
				<span className={styles.folderName} data-depth={depth}>
					{name}
				</span>
				<span className={styles.folderChevron}>
					{/* <BsChevronRight data-is-open={isOpen} data-depth={depth} /> */}
				</span>
				{/* <ChevronRightIcon className={styles.folderChevron} data-open={isOpen} /> */}
			</div>
			<Collapsible isOpen={isOpen && !disabled} isActive={isActive}>
				{children}
			</Collapsible>
		</div>
	);
};

type FsTreeProps = {
	branches: Array<Node>;
	activePathname: string;
};
const FsTree = ({ branches, activePathname }: FsTreeProps) => {
	/**
	 *  - top level folders have accent color
	 *  - lower level folders are unstyled, excerpt for if they are active, in which case they
	 *  have bold font
	 *  - selected pages have a background color of a slightly darker hue to the top level folder
	 *  of which they are a descendent
	 */

	const initialDepth = 0;

	const createTree = (
		branches: Array<Node>,
		depth: number,
		basePath: string,
	) => {
		return branches.map((node, index) => {
			switch (node.kind) {
				case "leaf":
					return (
						<File
							key={`file-${basePath}${node.path}-${index}`}
							name={node.name}
							path={`${node.path}`}
							depth={depth + 1}
							activePathname={activePathname}
						/>
					);
				case "branch":
					return (
						<Folder
							key={`folder-${basePath}${node.path}-${index}`}
							name={node.name}
							path={`${node.path}`}
							depth={depth + 1}
							baseColor={node.baseColor ?? { h: `0deg`, s: `7%`, l: `47%` }}
							disabled={node.disabled ? node.disabled : false}
							activePathname={activePathname}
						>
							{createTree(node.children, depth + 1, `${basePath}${node.path}`)}
						</Folder>
					);
			}
		});
	};
	return (
		<div className={styles.tree}>{createTree(branches, initialDepth, "")}</div>
	);
};

export { FsTree };
