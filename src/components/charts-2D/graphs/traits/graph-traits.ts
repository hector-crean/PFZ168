
/**
 * A graph consists of nodes and edges where edges connect exactly two nodes. A graph can be either directed, i.e., 
 * an edge has a source and a target node or undirected where there is no such distinction.

In a directed graph, each node u has outgoing and incoming neighbors. An outgoing neighbor of node u is any node v 
for which an edge (u, v) exists. An incoming neighbor of node u is any node v for which an edge (v, u) exists.

In an undirected graph there is no distinction between source and target node. A neighbor of node u is any node v 
for which either an edge (u, v) or (v, u) exists.
 */


/// Traits : 

//edges
interface GraphEdgeAddable<G, E, Ix> {
    addEdge: (graph: G, sourceId: NodeIdx<Ix>, targetId: NodeIdx<Ix>, data: E) => EdgeIdx<Ix>;
}

interface GraphEdgeIndexable<G, E, Ix> {
    edge: (graph: G, edgeIdx: EdgeIdx<Ix>) => E
}
interface GraphEdgeRemovable<G, E, Ix> {
    removeEdge: (graph: G, edgeIdx: EdgeIdx<Ix>) => E
}
interface GraphEdgeTo<G, E, Ix> {
    edgeTo: (graph: G, edgeIdx: EdgeIdx<Ix>) => NodeIdx<Ix>;
}
interface GraphEdgesFrom<G, E, Ty, Ix> {
    edgesFrom: (graph: G, nodeIdx: NodeIdx<Ix>, edgeType: Ty, indexType: Ix) => Array<EdgeIdx<Ix>>;
}
//nodes
interface GraphNodeAddable<G, N, Ix> {
    addNode: (graph: G, data: N) => NodeIdx<Ix>
}
interface GraphNodeRemovable<G, N, E, Ty, Ix> {
    removeEdge: (graph: G, nodeIdx: NodeIdx<Ix>, edgeType: Ty, indexType: Ix) => N
};

type NodeIdx<Ix> = Ix
type EdgeIdx<Ix> = Ix
type DirectedNess = 'Directed' | 'Undirected'


// declare const brand: unique symbol;

// export type Brand<T, TBrand> = T & { [brand]: TBrand };

//  structures :  


interface Node<N, Ix> {
    idx: Ix,
    /// Associated node data.
    datum: N,
    /// Next edge in outgoing and incoming edge lists.
    // next: [EdgeIdx<Ix>, EdgeIdx<Ix>],
}

interface Edge<E, Ix> {
    idx: Ix,
    /// Associated edge data.
    datum: E,
    source: NodeIdx<Ix>,
    target: NodeIdx<Ix>
}

interface Graph<N, E, Ty = DirectedNess, Ix = string> {
    nodes: Array<Node<N, Ix>>,
    edges: Array<Edge<E, Ix>>,
    ty: Ty,
}



// Tree structures (i.e unidirectional graphs)

type Leaf<N> = { tag: 'leaf', children: Array<TreeNode<N>> } & N;
type Root<N> = { tag: 'root', children: Array<TreeNode<N>> } & N
type TreeNode<N> = Leaf<N> | Root<N>
type ChildrenAccessor = <N>(node: TreeNode<N>) => TreeNode<N>;



// we can flatted this such that we have an array:


export type { Edge, Graph, Node, TreeNode };

