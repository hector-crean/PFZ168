type NonEmptyArray<T> = [T, ...T[]];

type File = {
  type: 'file';
  name: string;
  slug: `/${string}` | `#${string}` | string;
  baseColor?: { h: `${number}deg`; s: `${number}%`; l: `${number}%` };
  icon?: string;
  disclaimer?: string;
  disabled?: boolean;
};

const isFile = (node: unknown): node is File => {
  return (node as File)?.type === `file`;
};

type Folder = {
  type: 'folder';
  name: string;
  slug: `/${string}` | `#${string}` | string;
  baseColor?: { h: `${number}deg`; s: `${number}%`; l: `${number}%` };
  icon?: string;
  disabled?: boolean;
  disclaimer?: string;
  branches: NonEmptyArray<Node>;
};

const isFolder = (node: unknown): node is Folder => {
  return (node as Folder)?.type === `folder`;
};

type Node = Folder | File;

export type { File, Folder, Node, NonEmptyArray };
export { isFile, isFolder };
