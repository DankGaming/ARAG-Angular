import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
	faAngleDoubleDown,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { NodeService } from "src/app/node/node.service";
import { Node } from "src/app/node/node.model";
import { DirectedAcyclicGraph } from "src/app/node/directed-acyclic-graph.model";
import { ContentType } from "src/app/node/content-type.model";
import { Location } from "@angular/common";
import { skip } from "rxjs/operators";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { SetTreeModalComponent } from "../modals/set-tree-modal/set-tree-modal.component";
import { SetQuestionModalComponent } from "src/app/node/modals/set-question-modal.ts/set-question-modal.component";
import { SetNotificationModalComponent } from "src/app/node/modals/set-notification-modal/set-notification-modal.component";
import { ModalService } from "src/app/shared/modal.service";
import { ConfirmBoxModalComponent } from "src/app/shared/modals/confirm-box-modal/confirm-box-modal.component";
import { Subscription } from "rxjs";
import { AlertBoxModalComponent } from "src/app/shared/modals/alert-box-modal/alert-box-modal.component";

interface Top {
	node: Node;
	children: Node[];
}

@Component({
	selector: "app-employee-tree-overview",
	templateUrl: "./employee-tree-overview.component.html",
	styleUrls: ["./employee-tree-overview.component.scss"],
})
export class EmployeeTreeOverviewComponent implements OnInit, OnDestroy {
	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

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
		faAngleDoubleDown,
	};

	showEditTreeModal = false;

	private params: Params;
	private queryParams: Params;

	private treeSubjectSubscription: Subscription;

	constructor(
		private treeService: TreeService,
		private nodeService: NodeService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private modalService: ModalService
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
		this.treeSubjectSubscription = this.treeService.treeSubject.subscribe(
			() => this.refresh()
		);

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
		const modal = this.modalService.createModal(
			ConfirmBoxModalComponent,
			this.modalHost
		);
		modal.instance.description = `U staat op het punt om de boom '${this.tree.name}'
		te verwijderen. Deze actie kan niet ongedaan worden. Weet u het zeker?`;
		modal.instance.confirmed.subscribe(() => {
			this.treeService.remove(this.tree.id).subscribe(() => {
				this.router.navigate([".."], {
					relativeTo: this.route,
				});
			});
		});
	}

	editTree(): void {
		const modal = this.modalService.createModal(
			SetTreeModalComponent,
			this.modalHost
		);
		modal.instance.tree = this.tree;
	}

	createQuestion(): void {
		const modal = this.modalService.createModal(
			SetQuestionModalComponent,
			this.modalHost
		);
		modal.instance.tree = this.tree;
		modal.instance.set.subscribe((question: Node) =>
			this.changeTopNode(question)
		);
	}

	createNotification(): void {
		const modal = this.modalService.createModal(
			SetNotificationModalComponent,
			this.modalHost
		);
		modal.instance.tree = this.tree;
		modal.instance.set.subscribe((notification: Node) =>
			this.changeTopNode(notification)
		);
	}

	publishTree(): void {
		const modal = this.modalService.createModal(
			ConfirmBoxModalComponent,
			this.modalHost
		);
		modal.instance.description = `U staat op het punt om '${this.tree.name}'
		te publiceren. Dit betekent dat deze boom voor iedereen zichtbaar is. Weet u het zeker?`;
		modal.instance.confirmed.subscribe(() => {
			this.treeService.publish(this.tree.id).subscribe(
				() => {
					const alertModal = this.modalService.createModal(
						AlertBoxModalComponent,
						this.modalHost
					);
					alertModal.instance.title = `${this.tree.name} is gepubliceerd`;
					alertModal.instance.body = `${this.tree.name} is nu voor iedereen zichtbaar.`;
				},
				(err) => {
					const alertModal = this.modalService.createModal(
						AlertBoxModalComponent,
						this.modalHost
					);
					alertModal.instance.title = "Er is iets fout gegaan";
					alertModal.instance.body = err.error.error.message;
				}
			);
		});
	}

	unpublish(): void {
		const modal = this.modalService.createModal(
			ConfirmBoxModalComponent,
			this.modalHost
		);
		modal.instance.description = `U staat op het punt om '${this.tree.name}'
		te onpubliceren. Dit betekent dat deze boom voor niemand zichtbaar is, behalve medewerkers. Weet u het zeker?`;
		modal.instance.confirmed.subscribe(() => {
			const alertModal = this.modalService.createModal(
				AlertBoxModalComponent,
				this.modalHost
			);
			this.treeService.unpublish(this.tree.id).subscribe(
				() => {
					alertModal.instance.title = `${this.tree.name} is niet meer gepubliceerd`;
					alertModal.instance.body = `${this.tree.name} is nu voor niedereen zichtbaar, behalve werknemers.`;
				},
				(err) => {
					alertModal.instance.title = "Er is iets fout gegaan";
					alertModal.instance.body = err.error.error.message;
				}
			);
		});
	}

	ngOnDestroy(): void {
		this.treeSubjectSubscription.unsubscribe();
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
