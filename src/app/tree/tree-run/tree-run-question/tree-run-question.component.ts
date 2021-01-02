import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Tree } from "../../tree.model";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Node } from "src/app/node/node.model";
import { TreeService } from "../../tree.service";
import { NodeService } from "src/app/node/node.service";
import { NgForm } from "@angular/forms";
import { ContentType } from "src/app/node/content-type.model";
// import { ContentType } from "../../content-type.model";
// import { QuestionType } from "../../question-info.model";
// import { QuestionService } from "../../question.service";

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
    

    @Input() treeID: number;
    @Input() nodeID: number;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.treeID, this.nodeID).subscribe((node: Node) => {
            this.node = node;
            
            this.types.push({name: node.children[0].content, value: node.children[0]})
            this.types.push({name: node.children[1].content, value: node.children[1]})
        });
        console.log((this.node.content));
    }

    confirmAnswer(): void {
        if (this.type.value.children.length > 0) {
            console.log(this.type.value.children[0].content);
            this.nextNode = true;
            if (this.type.value.children[0].type == ContentType.QUESTION) {
                this.nextQuestion = true;
                console.log(this.type.value.children[0].type);
                console.log(this.nextQuestion);
            }
            else {
                this.nextQuestion = false;
                console.log(this.type.value.children[0].type);
                console.log(this.nextQuestion);
            }
        }
        else {
            console.log("kies een antwoord");
        }
	}

}