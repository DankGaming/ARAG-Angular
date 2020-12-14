import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import {
	faTrashAlt,
	faAngleDoubleUp,
	faWalking,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NodeService } from "src/app/node/node.service";
import { Node } from "src/app/node/node.model";
import { DirectedAcyclicGraph } from "src/app/node/directed-acyclic-graph.model";
import { ContentType } from "src/app/node/content-type.model";
import { Location } from "@angular/common";

interface Top {
	node: Node;
	children: Node[];
}

@Component({
	selector: "app-employee-tree-overview",
	templateUrl: "./employee-tree-overview.component.html",
	styleUrls: ["./employee-tree-overview.component.scss"],
})
export class EmployeeTreeOverviewComponent implements OnInit {
	tree: Tree;
	graph: DirectedAcyclicGraph;
	top: Top;

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
		faArrowLeft,
	};

	constructor(
		private treeService: TreeService,
		private nodeService: NodeService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.route.queryParams.subscribe((queryParams: Params) => {
				this.treeService.findByID(params.id).subscribe((tree: Tree) => {
					this.tree = tree;

					if (!queryParams.top) {
						return this.navigateToTop();
					}

					this.fetchTop(queryParams.top);
				});
			});
		});
	}

	private navigateToTop(nodeID: number = this.tree.root?.id): void {
		this.router.navigate([], {
			queryParams: {
				top: nodeID,
			},
			relativeTo: this.route,
			queryParamsHandling: "merge",
		});
	}

	back(): void {
		this.location.back();
	}

	fetchTop(id: number): void {
		this.nodeService
			.findDirectedAcyclicGraph(this.tree.id, {
				start: id,
				end: ContentType.QUESTION,
			})
			.subscribe((graph: DirectedAcyclicGraph) => {
				this.graph = graph;
				const node = graph.nodes[id];
				const edges = graph.edges[id];

				if (node.type !== ContentType.QUESTION)
					return this.navigateToTop();

				this.top = {
					node: node,
					children: edges.map((id: number) => graph.nodes[id]),
				};
			});
	}

	changeTopNode(node: Node): void {
		this.navigateToTop(node.id);
	}
}
