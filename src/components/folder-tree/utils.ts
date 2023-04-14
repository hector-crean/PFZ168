import { Folder, File, Node } from './types';

const matchNode = <R1, R2>(
  node: Node,
  onFile: (file: File) => R1,
  onFolder: (folder: Folder) => R2,
) => {
  switch (node.type) {
    case `file`:
      return onFile(node);
    case `folder`:
      return onFolder({
        ...node,
        branches: node.branches.map((child) => ({
          ...child,
          slug: `${node.slug}${child.slug}`,
        })),
      } as Folder);
  }
};

function fold<B>(
  f: (bs: Array<B>) => B,
  onFile: (file: File) => B,
): (folder: Folder) => B {
  const go = (folder: Folder): B =>
    f(
      folder.branches.map((node) => {
        return matchNode(node, onFile, go);
      }),
    );
  return go;
}

const findNode = (path: string) =>
  fold<Node>(
    (bs) => bs.reduce((prev, curr) => (curr.slug === path ? curr : prev)),
    (file) => file,
  );

export { findNode };
