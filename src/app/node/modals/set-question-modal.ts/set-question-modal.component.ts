import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "src/app/tree/tree.model";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
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
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Tree>>();

	isRoot: boolean = false;

	constructor(private questionService: QuestionService) {}

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
	}

	create(form: NgForm): void {
		const values = form.value;
		console.log(values);

		// this.questionService
		// 	.create(this.tree.id, {
		// 		content: values.content,
		// 		type: ContentType.QUESTION,
		// 		info: {
		// 			type: QuestionType.DROPDOWN,
		// 		},
		// 	})
		// 	.subscribe((node: Partial<Node>) => {
		// 		this.set.emit(node);
		// 		this.close();
		// 	});
	}

	update(form: NgForm): void {
		const values = form.value;

		this.questionService
			.update(this.tree.id, this.question.id, {
				content: values.content,
				info: {
					type: QuestionType.DROPDOWN,
				},
			})
			.subscribe((node: Partial<Node>) => {
				this.question.content = node.content;
				this.close();
			});
	}

	toggle(value: boolean): void {
		console.log(value);
	}
}
