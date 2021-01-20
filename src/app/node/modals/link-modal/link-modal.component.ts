import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Form } from "src/app/form/form.model";
import { FormService } from "src/app/form/form.service";
import { Modal } from "src/app/shared/modals/modal.interface";
import { FormNodeService } from "src/app/tree/forms/form-node.service";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";
import { AnswerService } from "../../answer.service";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
import { NodeService } from "../../node.service";
import { NotificationService } from "../../notification.service";

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
			value: ContentType.QUESTION,
		},
		{
			name: "Notificatie",
			value: ContentType.NOTIFICATION,
		},
		{
			name: "Meldingsformulier",
			value: ContentType.FORM,
		},
	];
	type = this.types[0];

	questions: Node[] = [];
	notifications: Node[] = [];
	formNodes: Node[] = [];
	forms: Form[] = [];

	nodes: Node[];
	defaultNode: Node;

	constructor(
		private notificationService: NotificationService,
		private answerService: AnswerService,
		private nodeService: NodeService,
		private treeService: TreeService,
		private formService: FormService,
		private formNodeService: FormNodeService
	) {}

	ngOnInit(): void {
		this.nodeService
			.linkables(this.tree.id, this.node.id)
			.subscribe((nodes: Node[]) => {
				this.questions = nodes.filter(
					(node: Node) => node.type === ContentType.QUESTION
				);
				this.notifications = nodes.filter(
					(node: Node) => node.type === ContentType.NOTIFICATION
				);

				this.formService.findAll().subscribe((forms: Form[]) => {
					this.forms = forms;
					forms.forEach((form: Form) => {
						this.formNodes.push({
							id: form.id,
							content: form.name,
							type: ContentType.FORM,
						});
					});

					this.nodeService
						.findByID(this.tree.id, this.node.id)
						.subscribe((node: Node) => {
							this.node = node;

							if (node.children?.length > 0) {
								const nodeType: ContentType =
									node.children[0].type;
								this.type = this.types.find(
									(type) => type.value === nodeType
								);
							}

							this.switchType();
						});
				});
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
			case ContentType.FORM:
				this.nodes = this.formNodes;
				break;
		}

		if (this.node.children.length > 0) {
			this.defaultNode =
				this.node.children[0].type === this.type.value
					? this.node.children[0]
					: this.nodes[0];
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

	private linkAnswer(form: NgForm): void {
		const values = form.value;

		if (values.nextNode.type === ContentType.FORM) {
			// Create form node
			this.createFormNode(values.nextNode).subscribe(
				(node: Partial<Node>) => {
					this.answerService
						.update(this.tree.id, this.topNode?.id, this.node.id, {
							next: node.id,
						})
						.subscribe(() => this.linked());
				}
			);
		} else {
			this.answerService
				.update(this.tree.id, this.topNode?.id, this.node.id, {
					next: values.nextNode.id,
				})
				.subscribe(() => this.linked());
		}
	}

	private linkNotification(form: NgForm): void {
		const values = form.value;

		if (values.nextNode.type === ContentType.FORM) {
			// Create form node
			this.createFormNode(values.nextNode).subscribe(
				(node: Partial<Node>) => {
					this.notificationService
						.update(this.tree.id, this.node.id, {
							next: node.id,
						})
						.subscribe(() => this.linked());
				}
			);
		} else {
			this.notificationService
				.update(this.tree.id, this.node.id, {
					next: values.nextNode.id,
				})
				.subscribe(() => this.linked());
		}
	}

	private createFormNode(formNode: Node): Observable<Partial<Node>> {
		const form: Form = this.forms.find((f: Form) => f.id === formNode.id);

		return this.formNodeService.create(this.tree.id, {
			content: form.name,
			type: ContentType.FORM,
			info: {
				form: form.id,
			},
		});
	}

	private linked(): void {
		this.close();
		this.treeService.treeSubject.next();
	}
}
