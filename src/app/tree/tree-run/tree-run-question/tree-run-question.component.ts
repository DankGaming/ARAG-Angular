import { Component, Input, OnInit} from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";
import { Tree } from "../../tree.model";

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
    answers: Node[] = [];
    nextQuestion = false;
    answerConfirmed = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.questionCounter++;
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;

            for (const i of node.children) {
                this.answers.push(i);
              }
            this.selectedAnswer = this.answers[0];
        });
    }

    confirmAnswer(): void {
        this.answerConfirmed = true;
        if (this.selectedAnswer.children?.length > 0) {
            if (this.selectedAnswer.children[0].type === ContentType.QUESTION) {
                this.nextQuestion = true;
            }
            else {
                this.nextQuestion = false;
            }
        }
    }
    
    answersCheck() {
        return (this.answers.length > 0);
    }

    nextNode() {
        return (this.selectedAnswer.children?.length > 0);
    }
}
