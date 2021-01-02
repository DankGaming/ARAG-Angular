import { Component, Input, OnInit } from "@angular/core";
import { Tree } from "../../tree.model";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";

@Component({
    selector: "app-tree-run-notification",
    templateUrl: "./tree-run-notification.component.html",
    styleUrls: ["./tree-run-notification.component.scss"],
})
export class TreeRunNotificationComponent implements OnInit {
    node: Node;
    hasChild = false;
    childType = false;
    childID: number;

    @Input() treeID: number;
    @Input() nodeID: number;
    
    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.treeID, this.nodeID).subscribe((node: Node) => {
            this.node = node;

            if (this.node.children.length > 0) {
                this.hasChild = true;
                this.childID = this.node.children[0].id;
                if (this.node.children[0].type = ContentType.QUESTION) {
                    this.childType = true;
                }
                else if (this.node.children[0].type = ContentType.NOTIFICATION) {
                    this.childType = false;
                }
            }
        });
        console.log((this.node.content));
    }
}