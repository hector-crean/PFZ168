// @ts-nocheck
import Link from "next/link";
import { MouseEventHandler, ReactNode, useState } from "react";
import styles from "./FolderTree.module.scss";




// Collapsible component for folder expansion
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

// File component
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

// Folder component
type FolderProps = {
	name: string;
	path: string;
	depth: number;
	disabled?: boolean;
	children: Array<ReactNode>;
	activePathname: string;
};

const Folder = ({
	name,
	path,
	depth,
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
			>
				<span className={styles.folderName} data-depth={depth}>
					{name}
				</span>
			</div>
			<Collapsible isOpen={isOpen && !disabled} isActive={isActive}>
				{children}
			</Collapsible>
		</div>
	);
};

// File system tree component
type NavTreeProps = {
	nodes: Array<TreeNode>;
	activePathname: string;
};
const NavTree = ({ nodes, activePathname }: NavTreeProps) => {
	let initialDepth = 0;

	// Recursive function to render tree nodes
	const renderNodes = (nodes: Array<TreeNode>, depth: number) => {

		return nodes.map((node, index) => {
			switch (node.kind) {
				case 'leaf':
					initialDepth += 1;

					return (
						<File
							key={`file-${node.path}-${index}`}
							name={node.name}
							path={`${node.path}`}
							depth={depth + 1}
							activePathname={activePathname}
						/>
					);
				case 'branch':
					initialDepth += 1;

					return (
						<Folder
							key={`folder-${node.path}-${index}`}
							name={node.name}
							path={`${node.path}`}
							depth={depth + 1}
							disabled={node.disabled ? node.disabled : false}
							activePathname={activePathname}
						>
							{renderNodes(node.children, depth + 1)}
						</Folder>
					);
			}
		})
	}

	return renderNodes(nodes, initialDepth)
}

export { NavTree };
