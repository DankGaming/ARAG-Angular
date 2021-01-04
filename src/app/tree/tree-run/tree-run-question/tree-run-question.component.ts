import { Component, Input, OnInit} from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";

@Component({
    selector: "app-tree-run-question",
    templateUrl: "./tree-run-question.component.html",
    styleUrls: ["./tree-run-question.component.scss"],
})
export class TreeRunQuestionComponent implements OnInit {
    @Input() treeID: number;
    @Input() nodeID: number;
    @Input() questionCounter: number;

    node: Node;
    selectedAnswer: { name: string; value: Node };
    answers: { name: string; value: Node }[] = [];
    answersCheck = false;
    nextNode = false;
    nextQuestion = false;
    answerConfirmed = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.questionCounter = this.questionCounter + 1;
        this.nodeService.findByID(this.treeID, this.nodeID).subscribe((node: Node) => {
            this.node = node;

            for (const i of node.children) {
                this.answers.push({name: i.content, value: i});
              }
            this.selectedAnswer = this.answers[0];
            this.answersCheck = true;
        });
    }

    confirmAnswer(): void {
        this.answerConfirmed = true;
        if (this.selectedAnswer.value.children.length > 0) {
            this.nextNode = true;
            if (this.selectedAnswer.value.children[0].type === ContentType.QUESTION) {
                this.nextQuestion = true;
            }
            else {
                this.nextQuestion = false;
            }
        }
	}
}
