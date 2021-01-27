import { Component, Input, OnInit } from "@angular/core";
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
    childType: ContentType;
    types = {
		question: ContentType.QUESTION,
		notification: ContentType.NOTIFICATION,
		form: ContentType.FORM,
	};

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            if (this.hasChild()) {
                this.childType = this.node.children[0].type;
            }
        });
    }

    hasNode(): boolean {
        return this.node != null;
    }

    hasChild(): boolean {
        return this.node.children?.length > 0;
    }
}
