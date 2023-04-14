type Hsl = { h: `${number}deg`; s: `${number}%`; l: `${number}%` };

interface Leaf {
	kind: "leaf";
	path: string;
	file: string;
	name: string;
	baseColor: Hsl;
	disabled: boolean;
}

interface Branch {
	kind: "branch";
	name: string;
	path: string;
	file: string;
	baseColor: Hsl;
	disabled: boolean;
	children: Node[];
}

type Node = Leaf | Branch;

type Tree = Array<Node>;

export type { Leaf, Branch, Tree, Node };
