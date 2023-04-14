"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Tree } from "../models/tree";
import { v4 as v4uuid } from "uuid";

interface Props {
	tree: Tree;
}
const TOC = ({ tree }: Props) => (
	<AnimatePresence key={`animation-presence-${v4uuid()}`}>
		<motion.ul
			key={`tree-${v4uuid()}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{tree.map((node) => {
				switch (node.kind) {
					case "branch":
						return (
							<>
								<motion.li
									key={`branch-li-${node.path}-${v4uuid()}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									{node.name}
								</motion.li>
								<motion.ul
									key={`branch-ul-${node.path}-${v4uuid()}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<TOC key={`tree-${v4uuid()}`} tree={node.children} />
								</motion.ul>
							</>
						);
					case "leaf":
						return (
							<motion.li
								key={`leaf-li-${node.path}-${v4uuid()}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{node.name}
							</motion.li>
						);
				}
			})}
		</motion.ul>
	</AnimatePresence>
);

export { TOC };
