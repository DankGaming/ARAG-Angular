import { Component, Input, OnDestroy, OnInit} from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";
import { Tree } from "../../tree.model";
import { QuestionType } from "src/app/node/question-info.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-tree-run-question",
    templateUrl: "./tree-run-question.component.html",
    styleUrls: ["./tree-run-question.component.scss"],
})
export class TreeRunQuestionComponent implements OnInit, OnDestroy {
    @Input() tree: Tree;
    @Input() nodeInput: Node;
    @Input() questionCounter: number;
    @Input() previousAnswers: {[question: number]: number};

    node: Node;
    selectedAnswer: Node;
    selectedRadioAnswer: string;
    answers: Node[] = [];
    answerConfirmed = false;
    childType: ContentType;
    types = {
		question: ContentType.QUESTION,
		notification: ContentType.NOTIFICATION,
		form: ContentType.FORM,
	};

    nodeServiceSubscription: Subscription;
    answerNodeServiceSubscription: Subscription;

    constructor(private nodeService: NodeService) {}

    ngOnDestroy(): void {
        this.nodeServiceSubscription.unsubscribe();
        if (this.answerNodeServiceSubscription) {
            this.answerNodeServiceSubscription.unsubscribe();
        }
        if (this.answerConfirmed) {
            delete this.previousAnswers[this.node.id];
        }
    }

    ngOnInit(): void {
        this.questionCounter++;
        this.nodeServiceSubscription = this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            this.answers = node.children;
            this.selectedAnswer = this.answers[0];
        });
    }

    confirmAnswer(): void {
        this.answerConfirmed = false;
        if (this.questionTypeIsRadio()) {
            if (this.selectedRadioAnswer != null) {
                const answerId = Number(this.selectedRadioAnswer);
                this.answerNodeServiceSubscription = this.nodeService.findByID(this.tree.id, answerId).subscribe((node: Node) => {
                    this.selectedAnswer = node;
                    this.previousAnswers[this.node.id] = this.selectedAnswer.id;
                    if (this.hasChildNode()) {
                        this.childType = this.selectedAnswer.children[0].type;
                    }
                    this.answerConfirmed = true;
                });
            }
            else {
                this.selectedAnswer = new Node();
            }
        }
        else {
            this.answerNodeServiceSubscription = this.nodeService.findByID(this.tree.id, this.selectedAnswer.id).subscribe(() => {
                this.previousAnswers[this.node.id] = this.selectedAnswer.id;
                if (this.hasChildNode()) {
                    this.childType = this.selectedAnswer.children[0].type;
                }
                this.answerConfirmed = true;
            });
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
