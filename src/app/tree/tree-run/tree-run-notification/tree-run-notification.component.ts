import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";
import { Tree } from "../../tree.model";

@Component({
    selector: "app-tree-run-notification",
    templateUrl: "./tree-run-notification.component.html",
    styleUrls: ["./tree-run-notification.component.scss"],
})
export class TreeRunNotificationComponent implements OnInit {
    @Input() tree: Tree;
    @Input() nodeInput: Node;
    @Input() questionCounter: number;
    @Input() previousAnswers: {[question: number]: number};

    node: Node;
    childType: string = "";

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            if (this.hasChild()) {
                if (this.childTypeIsQuestion()) {
                    this.childType = "question";
                }
                else if (this.childTypeIsNotification()) {
                    this.childType = "notification";
                }
                else if (this.childTypeIsForm()) {
                    this.childType = "form";
                }
            }
        });
    }

    hasNode(): boolean {
        return this.node != null;
    }

    hasChild(): boolean {
        return this.node.children?.length > 0;
    }

    childTypeIsQuestion(): boolean {
        return this.node.children[0].type === ContentType.QUESTION;
    }

    childTypeIsNotification(): boolean {
        return this.node.children[0].type === ContentType.NOTIFICATION;
    }

    childTypeIsForm(): boolean {
        return this.node.children[0].type === ContentType.FORM;
    }
}
