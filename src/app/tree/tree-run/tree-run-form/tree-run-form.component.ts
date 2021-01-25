import { Component, Input, OnInit } from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { Tree } from "../../tree.model";

@Component({
    selector: "app-tree-run-form",
    templateUrl: "./tree-run-form.component.html",
    styleUrls: ["./tree-run-form.component.scss"],
})
export class TreeRunFormComponent implements OnInit {
    @Input() tree: Tree;
    @Input() nodeInput: Node;
    @Input() previousAnswers: {[question: number]: number};

    node: Node;
    get encodedAnswers(): string {
        return btoa(JSON.stringify(this.previousAnswers));
    }

    constructor(private nodeService: NodeService) {}

    ngOnInit(): void {
        this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
        });
    }
}
