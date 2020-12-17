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

	types = [
		{ name: "Dropdown", value: QuestionType.DROPDOWN },
		{ name: "Radio", value: QuestionType.RADIO },
	];
	type: { name: string; value: QuestionType };

	constructor(
		private questionService: QuestionService,
		private nodeService: NodeService
	) {}

	ngOnInit(): void {
		this.type =
			this.types.find(
				(type) => type.value === this.question?.questionInfo.type
			) ?? this.types[0];
	}

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
					type: values.type.value,
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
					type: values.type.value,
				},
			})
			.subscribe((node: Partial<Node>) => {
				this.question.content = node.content;
				this.question.questionInfo.type = this.type.value;
				if (values.treeRoot) this.tree.root = this.question;
				this.close();
			});
	}

	remove(): void {
		this.nodeService.remove(this.tree.id, this.question.id).subscribe();
		this.close();
	}
}
