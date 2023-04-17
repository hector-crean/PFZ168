type Hsl = { h: `${number}deg`; s: `${number}%`; l: `${number}%` };

interface Leaf {
	kind: "leaf";
	path: string;
	file: string;
	name: string;
	heroImage?: string;
	disabled: boolean;
}

interface Branch {
	kind: "branch";
	name: string;
	path: string;
	file: string;
	disabled: boolean;
	heroImage?: string;
	children: Node[];
}

type Node = Leaf | Branch;

type Tree = Array<Node>;

export type { Branch, Leaf, Node, Tree };

