import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import {
	faTrashAlt,
	faAngleDoubleUp,
	faWalking,
	faArrowLeft,
	faPen,
	faPlus,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { NodeService } from "src/app/node/node.service";
import { Node } from "src/app/node/node.model";
import { DirectedAcyclicGraph } from "src/app/node/directed-acyclic-graph.model";
import { ContentType } from "src/app/node/content-type.model";
import { Location } from "@angular/common";
import { skip } from "rxjs/operators";

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

	modals = {
		showSetQuestion: false,
	};

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
		faArrowLeft,
		faPen,
		faPlus,
		faSearch,
	};

	private params: Params;
	private queryParams: Params;

	showEditTreeModal = false;

	constructor(
		private treeService: TreeService,
		private nodeService: NodeService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		// Set initial values
		this.params = this.route.snapshot.params;
		this.queryParams = this.route.snapshot.queryParams;

		// Subscribe to changes
		this.route.params.pipe(skip(1)).subscribe((params: Params) => {
			this.params = params;
			this.refresh();
		});
		this.route.queryParams
			.pipe(skip(1))
			.subscribe((queryParams: Params) => {
				this.queryParams = queryParams;
				this.refresh();
			});
		// Subscribe to changes on tree so you can immediately see changes
		this.treeService.treeSubject.subscribe(() => this.refresh());

		// Fetch tree and nodes for the first time
		this.refresh();
	}

	refresh(): void {
		this.treeService.findByID(this.params.id).subscribe((tree: Tree) => {
			this.tree = tree;

			if (!this.queryParams.top) {
				return this.navigateToTop(this.tree.root?.id, true);
			}

			this.fetchTop(this.queryParams.top);
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

				if (node.type === ContentType.ANSWER)
					return this.navigateToTop();

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
