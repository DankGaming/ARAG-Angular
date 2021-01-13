import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
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
	faUnlink,
} from "@fortawesome/free-solid-svg-icons";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { SetQuestionModalComponent } from "src/app/node/modals/set-question-modal.ts/set-question-modal.component";
import { SetAnswerModalComponent } from "src/app/node/modals/set-answer-modal/set-answer-modal.component";
import { LinkModalComponent } from "src/app/node/modals/link-modal/link-modal.component";
import { SetNotificationModalComponent } from "src/app/node/modals/set-notification-modal/set-notification-modal.component";
import { AnswerService } from "src/app/node/answer.service";
import { NotificationService } from "src/app/node/notification.service";
import { TreeService } from "src/app/tree/tree.service";
import { ConfirmBoxModalComponent } from "src/app/shared/modals/confirm-box-modal/confirm-box-modal.component";

@Component({
	selector: "app-node-container",
	templateUrl: "./node-container.component.html",
	styleUrls: ["./node-container.component.scss"],
})
export class NodeContainerComponent implements OnInit {
	@Input() node: Node;
	@Input() previousNode?: Node;
	@Input() topNode: Node;
	@Input() tree: Tree;
	@Input() graph: DirectedAcyclicGraph;
	@Input() isCurrentTop: boolean = false;

	@Output() expand = new EventEmitter<Node>();

	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	types = {
		question: ContentType.QUESTION,
		answer: ContentType.ANSWER,
		notification: ContentType.NOTIFICATION,
	};
	icons = {
		faChevronRight,
		faArrowDown,
		faTree,
		faLink,
		faPen,
		faPlus,
		faUnlink,
	};

	modals = {
		showSetQuestion: false,
		showSetAnswer: false,
		showLink: false,
	};

	constructor(
		private modalService: ModalService,
		private answerService: AnswerService,
		private notificationService: NotificationService,
		private treeService: TreeService
	) {}

	ngOnInit(): void {}

	isRoot = (): boolean => this.node.id === this.tree.root?.id;
	hasChildren = (): boolean => this.graph.edges[this.node.id].length > 0;

	isQuestion = (): boolean => this.node.type === ContentType.QUESTION;
	isNotification = (): boolean => this.node.type === ContentType.NOTIFICATION;
	isAnswer = (): boolean => this.node.type === ContentType.ANSWER;

	expandNode(node: Partial<Node>): void {
		this.expand.emit(node as Node);
	}

	editQuestion(): void {
		const modal = this.modalService.createModal(
			SetQuestionModalComponent,
			this.modalHost
		);
		modal.instance.isRoot = this.isRoot();
		modal.instance.tree = this.tree;
		modal.instance.question = this.node;
	}

	editNotification(): void {
		const modal = this.modalService.createModal(
			SetNotificationModalComponent,
			this.modalHost
		);
		modal.instance.isRoot = this.isRoot();
		modal.instance.tree = this.tree;
		modal.instance.notification = this.node;
	}

	setAnswer(): void {
		const modal = this.modalService.createModal(
			SetAnswerModalComponent,
			this.modalHost
		);
		modal.instance.question = this.isQuestion()
			? this.node
			: this.previousNode;
		modal.instance.answer = this.isAnswer() ? this.node : null;
		modal.instance.tree = this.tree;
	}

	linkNode(): void {
		const modal = this.modalService.createModal(
			LinkModalComponent,
			this.modalHost
		);
		modal.instance.tree = this.tree;
		modal.instance.node = this.node;
		modal.instance.topNode = this.topNode;
	}

	unlink(): void {
		const modal = this.modalService.createModal(
			ConfirmBoxModalComponent,
			this.modalHost
		);
		modal.instance.confirmed.subscribe(() => {
			switch (this.node.type) {
				case ContentType.ANSWER:
					this.unlinkAnswer();
					break;
				case ContentType.NOTIFICATION:
					this.unlinkNotification();
					break;
			}
		});
	}

	private unlinkAnswer(): void {
		this.answerService
			.unlink(this.tree.id, this.topNode.id, this.node.id)
			.subscribe(() => {
				this.treeService.treeSubject.next();
			});
	}

	private unlinkNotification(): void {
		this.notificationService
			.unlink(this.tree.id, this.node.id)
			.subscribe(() => {
				this.treeService.treeSubject.next();
			});
	}
}
