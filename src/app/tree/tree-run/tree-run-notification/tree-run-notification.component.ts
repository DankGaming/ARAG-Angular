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

    node: Node;
    hasChild = false;
    childType = false;
    nodeCheck = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            this.nodeCheck = true;

            if (this.node.children.length > 0) {
                this.hasChild = true;
                if (this.node.children[0].type === ContentType.QUESTION) {
                    this.childType = true;
                }
                else if (this.node.children[0].type === ContentType.NOTIFICATION) {
                    this.childType = false;
                }
            }
        });
    }
}
