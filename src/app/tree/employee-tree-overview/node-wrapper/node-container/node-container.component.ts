import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
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
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { SetQuestionModalComponent } from "src/app/node/modals/set-question-modal.ts/set-question-modal.component";
import { SetAnswerModalComponent } from "src/app/node/modals/set-answer-modal/set-answer-modal.component";
import { LinkModalComponent } from "src/app/node/modals/link-modal/link-modal.component";

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

	@ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;

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

	constructor(private modalService: ModalService) {}

	ngOnInit(): void {}

	isRoot = (): boolean => this.node.id === this.tree.root?.id;

	isQuestion = (): boolean => this.node.type === ContentType.QUESTION;
	isNotification = (): boolean => this.node.type === ContentType.NOTIFICATION;
	isAnswer = (): boolean => this.node.type === ContentType.ANSWER;

	expandNode(node: Partial<Node>): void {
		this.expand.emit(node as Node);
	}

	editQuestion(): void {
		const modal = this.modalService.createModal(SetQuestionModalComponent, this.modalHost);
		modal.instance.isRoot = this.isRoot();
		modal.instance.tree = this.tree;
		modal.instance.question = this.node;
	}

	setAnswer(): void {
		const modal = this.modalService.createModal(SetAnswerModalComponent, this.modalHost);
		modal.instance.question = this.isQuestion() ? this.node : this.previousNode;
		modal.instance.answer = this.isAnswer() ? this.node : null;
		modal.instance.tree = this.tree;
	}

	linkNode(): void {
		const modal = this.modalService.createModal(LinkModalComponent, this.modalHost);
		modal.instance.tree = this.tree;
		modal.instance.node = this.node;
		modal.instance.previousNode = this.isAnswer() ? this.previousNode : null;
	}
}
