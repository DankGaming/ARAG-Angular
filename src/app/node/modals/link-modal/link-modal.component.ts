import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";
import { AnswerService } from "../../answer.service";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
import { NodeService } from "../../node.service";
import { NotificationService } from "../../notification.service";
import { QuestionService } from "../../question.service";

@Component({
	selector: "app-link-modal",
	templateUrl: "./link-modal.component.html",
	styleUrls: ["./link-modal.component.scss"],
})
export class LinkModalComponent implements OnInit {
	@Input() tree: Tree;
	@Input() node: Node;
	@Input() previousNode?: Node;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Node>>();

	type?: { name: string; value: ContentType } = {
		name: "Notification",
		value: ContentType.NOTIFICATION,
	};

	questions: Node[] = [];
	notifications: Node[] = [];

	nodes: Node[];

	get defaultNode(): Node {
		if (this.type && this.node.children?.length > 0) {
			return this.node.children[0];
		} else {
			return this.nodes[0];
		}
	}

	constructor(
		private questionService: QuestionService,
		private notificationService: NotificationService,
		private answerService: AnswerService,
		private nodeService: NodeService,
		private treeService: TreeService
	) {}

	ngOnInit(): void {
		this.questionService
			.findAll(this.tree.id)
			.subscribe((questions: Node[]) => {
				this.questions = questions;
			});

		this.notificationService
			.findAll(this.tree.id)
			.subscribe((notifications: Node[]) => {
				this.notifications = notifications;
			});

		this.nodeService
			.findByID(this.tree.id, this.node.id)
			.subscribe((node: Node) => {
				this.node = node;

				if (node.children.length > 0) {
					const nodeType: ContentType = node.children[0].type;
					this.type = {
						name:
							nodeType === ContentType.QUESTION
								? "Vraag"
								: "Notificatie",
						value: nodeType,
					};
				}

				this.switchType();
			});
	}

	close = (): void => this.closeModal.emit();

	switchType(): void {
		switch (this.type.value) {
			case ContentType.QUESTION:
				this.nodes = this.questions;
				break;
			case ContentType.NOTIFICATION:
				this.nodes = this.notifications;
				break;
		}
	}

	link(form: NgForm): void {
		switch (this.type.value) {
			case ContentType.QUESTION:
				this.linkQuestion(form);
				break;
			case ContentType.NOTIFICATION:
				this.linkNotification(form);
				break;
		}
	}

	private linkQuestion(form: NgForm): void {
		const values = form.value;

		this.answerService
			.update(this.tree.id, this.previousNode?.id, this.node.id, {
				next: values.nextNode.id,
			})
			.subscribe(() => this.linked());
	}

	private linkNotification(form: NgForm): void {
		const values = form.value;

		this.notificationService
			.update(this.tree.id, this.node.id, {
				next: values.nextNode.id,
			})
			.subscribe(() => this.linked());
	}

	private linked(): void {
		this.close();
		this.treeService.treeSubject.next();
	}
}
