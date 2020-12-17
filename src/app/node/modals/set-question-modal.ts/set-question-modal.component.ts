import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "src/app/tree/tree.model";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
import { NodeService } from "../../node.service";
import { QuestionType } from "../../question-info.model";
import { QuestionService } from "../../question.service";

@Component({
	selector: "app-set-question-modal",
	templateUrl: "./set-question-modal.component.html",
	styleUrls: ["./set-question-modal.component.scss"],
})
export class SetQuestionModalComponent implements OnInit {
	@Input() tree: Tree;
	@Input() question?: Node;
	@Input() isRoot: boolean = false;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Node>>();

	constructor(
		private questionService: QuestionService,
		private nodeService: NodeService
	) {}

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
	}

	create(form: NgForm): void {
		const values = form.value;

		this.questionService
			.create(this.tree.id, {
				content: values.content,
				type: ContentType.QUESTION,
				root: values.treeRoot,
				info: {
					type: QuestionType.DROPDOWN,
				},
			})
			.subscribe((node: Partial<Node>) => {
				this.set.emit(node);
				this.close();
			});
	}

	update(form: NgForm): void {
		const values = form.value;

		this.questionService
			.update(this.tree.id, this.question.id, {
				content: values.content,
				root: values.treeRoot,
				info: {
					type: QuestionType.DROPDOWN,
				},
			})
			.subscribe((node: Partial<Node>) => {
				this.question.content = node.content;
				this.close();
			});
	}

	remove(): void {
		this.nodeService.remove(this.tree.id, this.question.id).subscribe();
		this.close();
	}
}
