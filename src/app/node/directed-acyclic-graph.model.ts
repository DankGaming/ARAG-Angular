import { Node } from "./node.model";

export interface DirectedAcyclicGraph {
	nodes: {
		[key: number]: Node;
	};
	edges: {
		[key: number]: number[];
	};
}
