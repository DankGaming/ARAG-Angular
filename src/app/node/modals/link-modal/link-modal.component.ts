import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
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
export class LinkModalComponent implements OnInit, Modal {
	@Input() tree: Tree;
	@Input() node: Node;
	@Input() topNode: Node;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Node>>();

	types: { name: string; value: ContentType }[] = [
		{
			name: "Vraag",
			value: ContentType.QUESTION
		},
		{
			name: "Notificatie",
			value: ContentType.NOTIFICATION
		}
	];
	type = this.types[0];

	questions: Node[] = [];
	notifications: Node[] = [];

	nodes: Node[];
	defaultNode: Node;

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
				const notification = this.notifications.find((notification: Node) => notification.id == this.node.id);
				if (notification) {
					const index = this.notifications.indexOf(notification);
					this.notifications.splice(index, 1);
				}
			});

		this.nodeService
			.findByID(this.tree.id, this.node.id)
			.subscribe((node: Node) => {
				this.node = node;

				if (node.children?.length > 0) {
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

		if (this.node.children.length > 0) {
			this.defaultNode = this.node.children[0].type === this.type.value ? this.node.children[0] : this.nodes[0];
		} else {
			this.defaultNode = this.nodes[0];
		}
	}

	link(form: NgForm): void {
		switch (this.node.type) {
			case ContentType.ANSWER:
				this.linkAnswer(form);
				break;
			case ContentType.NOTIFICATION:
				this.linkNotification(form);
				break;
		}
	}

	unlink(): void {
		switch (this.node.type) {
			case ContentType.ANSWER:
				this.unlinkAnswer();
				break;
			case ContentType.NOTIFICATION:
				this.unlinkNotification();
				break;
		}
	}

	private unlinkAnswer(): void {
		this.answerService.unlink(this.tree.id, this.topNode.id, this.node.id).subscribe(() => {
			this.treeService.treeSubject.next();
		});
	}

	private unlinkNotification(): void {
		this.notificationService.unlink(this.tree.id, this.node.id).subscribe(() => {
			this.treeService.treeSubject.next();
		});
	}

	private linkAnswer(form: NgForm): void {
		const values = form.value;

		this.answerService
			.update(this.tree.id, this.topNode?.id, this.node.id, {
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
