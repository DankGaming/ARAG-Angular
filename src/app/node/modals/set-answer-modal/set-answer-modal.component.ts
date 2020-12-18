import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";
import { AnswerService } from "../../answer.service";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
import { NodeService } from "../../node.service";

@Component({
	selector: "app-set-answer-modal",
	templateUrl: "./set-answer-modal.component.html",
	styleUrls: ["./set-answer-modal.component.scss"],
})
export class SetAnswerModalComponent implements OnInit {
	@Input() tree: Tree;
	@Input() question: Node;
	@Input() answer?: Node;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Node>>();

	constructor(
		private answerService: AnswerService,
		private nodeService: NodeService,
		private treeService: TreeService
	) {}

	ngOnInit(): void {}

	close = (): void => this.closeModal.emit();

	create(form: NgForm): void {
		const values = form.value;

		this.answerService
			.create(this.tree.id, this.question.id, {
				content: values.content,
				type: ContentType.ANSWER,
			})
			.subscribe((answer: Partial<Node>) => {
				this.set.emit(answer);
				this.close();
			});
	}

	update(form: NgForm): void {
		const values = form.value;

		this.answerService
			.update(this.tree.id, this.question.id, this.answer.id, {
				content: values.content,
			})
			.subscribe((answer: Partial<Node>) => {
				this.set.emit(answer);
				this.close();
				this.treeService.treeSubject.next();
			});
	}

	remove(): void {
		this.nodeService.remove(this.tree.id, this.answer.id).subscribe();
		this.close();
	}
}
