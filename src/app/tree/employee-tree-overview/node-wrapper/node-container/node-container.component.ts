import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentType } from "src/app/node/content-type.model";
import { DirectedAcyclicGraph } from "src/app/node/directed-acyclic-graph.model";
import { Node } from "src/app/node/node.model";
import { Tree } from "src/app/tree/tree.model";
import {
	faChevronRight,
	faArrowDown,
	faTree,
	faLink,
	faPen,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-node-container",
	templateUrl: "./node-container.component.html",
	styleUrls: ["./node-container.component.scss"],
})
export class NodeContainerComponent implements OnInit {
	@Input() node: Node;
	@Input() previousNode?: Node;
	@Input() tree: Tree;
	@Input() graph: DirectedAcyclicGraph;
	@Input() isCurrentTop: boolean = false;

	@Output() expand = new EventEmitter<Node>();

	types = {
		question: ContentType.QUESTION,
		answer: ContentType.ANSWER,
		notification: ContentType.NOTIFICATION,
	};
	icons = { faChevronRight, faArrowDown, faTree, faLink, faPen, faPlus };

	modals = {
		showSetQuestion: false,
		showSetAnswer: false,
		showLink: false,
	};

	constructor() {}

	ngOnInit(): void {}

	isRoot = (): boolean => this.node.id === this.tree.root?.id;

	isQuestion = (): boolean => this.node.type === ContentType.QUESTION;
	isNotification = (): boolean => this.node.type === ContentType.NOTIFICATION;
	isAnswer = (): boolean => this.node.type === ContentType.ANSWER;

	expandNode(node: Partial<Node>): void {
		this.expand.emit(node as Node);
	}
}
