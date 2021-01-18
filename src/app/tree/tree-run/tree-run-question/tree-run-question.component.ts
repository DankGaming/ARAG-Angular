import { Component, Input, OnInit} from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";
import { Tree } from "../../tree.model";
import { QuestionType } from "src/app/node/question-info.model";

@Component({
    selector: "app-tree-run-question",
    templateUrl: "./tree-run-question.component.html",
    styleUrls: ["./tree-run-question.component.scss"],
})
export class TreeRunQuestionComponent implements OnInit {
    @Input() tree: Tree;
    @Input() nodeInput: Node;
    @Input() questionCounter: number;

    node: Node;
    selectedAnswer: Node;
    selectedRadioAnswer: string;
    answers: Node[] = [];
    nextNodeIsQuestion = false;
    nextNodeIsNotification = false;
    answerConfirmed = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.questionCounter++;
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            this.answers = node.children;
            this.selectedAnswer = this.answers[0];
        });
    }

    confirmAnswer(): void {
        if (this.questionTypeIsRadio()) {
            var answerId = Number(this.selectedRadioAnswer)
            this.nodeService.findByID(this.tree.id, answerId).subscribe((node: Node) => {
                this.selectedAnswer = node;
            });
        }
        this.answerConfirmed = false;
        this.nextNodeIsNotification = false;
        this.nextNodeIsQuestion = false;
        if (this.hasChildNode()) {
            if (this.selectedAnswer.children[0].type === ContentType.QUESTION) {
                this.nextNodeIsNotification = false;
                this.nextNodeIsQuestion = true;
            }
            else {
                this.nextNodeIsQuestion = false;
                this.nextNodeIsNotification = true;
            }
            this.answerConfirmed = true;
        }
    }

    hasAnswers(): boolean {
        return this.answers.length > 0;
    }

    hasChildNode(): boolean {
        return this.selectedAnswer.children?.length > 0;
    }

    questionTypeIsRadio(): boolean {
        return this.node.questionInfo.type === QuestionType.RADIO;
    }
}
