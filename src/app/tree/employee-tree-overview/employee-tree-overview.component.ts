import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import {
	faTrashAlt,
	faAngleDoubleUp,
	faWalking,
	faArrowLeft,
	faPlus,
	faSearch,
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

	searchValue: string = "";
	searchResults: {
		questions: Node[];
		notifications: Node[];
	};
	searchTimeout: number;

	modals: {
		setQuestion: {
			show: boolean;
			question: Node;
		};
	} = {
		setQuestion: {
			show: false,
			question: null,
		},
	};

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
		faArrowLeft,
		faPlus,
		faSearch,
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
						return this.navigateToTop(this.tree.root?.id, true);
					}

					this.fetchTop(queryParams.top);
				});
			});
		});
	}

	back = (): void => this.location.back();

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

				// if (node.type !== ContentType.QUESTION)
				// 	return this.navigateToTop();

				this.top = {
					node,
					children: edges.map((id: number) => graph.nodes[id]),
				};
			});
	}

	changeTopNode(node: Partial<Node>): void {
		this.navigateToTop(node.id);
	}

	search(wait: boolean = true): void {
		if (!this.searchValue) {
			clearTimeout(this.searchTimeout);
			this.searchTimeout = null;
			return this.clearSearchResults();
		}

		if (this.searchTimeout) clearTimeout(this.searchTimeout);

		this.searchTimeout = window.setTimeout(
			() => {
				this.searchDirectedAcyclicGraph();
				this.searchTimeout = null;
			},
			wait ? 200 : 0
		);
	}

	searchDirectedAcyclicGraph(): void {
		this.nodeService
			.findDirectedAcyclicGraph(this.tree.id, {
				search: this.searchValue.trim(),
			})
			.subscribe((graph: DirectedAcyclicGraph) => {
				const nodes = Object.values(graph.nodes);

				this.searchResults = {
					questions: nodes.filter(
						(node: Node) => node.type === ContentType.QUESTION
					),
					notifications: nodes.filter(
						(node: Node) => node.type === ContentType.NOTIFICATION
					),
				};
			});
	}

	clearSearchResults(): void {
		this.searchResults = null;
	}

	clearSearchValue(): void {
		this.searchValue = "";
	}

	removeTree(): void {
		this.treeService.remove(this.tree.id).subscribe(() => {
			this.router.navigate([".."], {
				relativeTo: this.route,
			});
		});
	}

	editQuestion(node: Node): void {
		this.modals.setQuestion.question = node;
		this.modals.setQuestion.show = true;
	}

	private navigateToTop(
		nodeID: number = this.tree.root?.id,
		replaceUrl: boolean = false
	): void {
		this.router.navigate([], {
			queryParams: {
				top: nodeID,
			},
			relativeTo: this.route,
			queryParamsHandling: "merge",
			replaceUrl,
		});
	}
}
