import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";

@Component({
    selector: "app-tree-run-question",
    templateUrl: "./tree-run-question.component.html",
    styleUrls: ["./tree-run-question.component.scss"],
})
export class TreeRunQuestionComponent implements OnInit {
    node: Node;
    selectedAnswer: { name: string; value: Node };
    type: { name: string; value: Node };
    types: { name: string; value: Node }[] = [];
    nextNode =false;
    nextQuestion = false;
    answerConfirmed = false;
    

    @Input() treeID: number;
    @Input() nodeID: number;
    @Input() questionCounter: number;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.questionCounter = this.questionCounter + 1;
        this.nodeService.findByID(this.treeID, this.nodeID).subscribe((node: Node) => {
            this.node = node;
            
            for (let i of node.children) {
                this.types.push({name: i.content, value: i});
              }
        });
    }

    confirmAnswer(): void {
        this.answerConfirmed = true;
        if (this.type.value.children.length > 0) {
            this.nextNode = true;
            if (this.type.value.children[0].type == ContentType.QUESTION) {
                this.nextQuestion = true;
            }
            else {
                this.nextQuestion = false;
            }
        }
	}
}