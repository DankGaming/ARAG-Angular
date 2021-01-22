import { Component, Input, OnInit } from "@angular/core";
import { Node } from "src/app/node/node.model";
import { NodeService } from "src/app/node/node.service";
import { ContentType } from "src/app/node/content-type.model";
import { Tree } from "../../tree.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-tree-run-form",
    templateUrl: "./tree-run-form.component.html",
    styleUrls: ["./tree-run-form.component.scss"],
})
export class TreeRunFormComponent implements OnInit {
    @Input() tree: Tree;
    @Input() nodeInput: Node;
    @Input() previousAnswers:{[question:number]:number};

    node: Node;
    get encodedAnswers(): string {
        return btoa(JSON.stringify(this.previousAnswers));
    }

    nodeServiceSubscription: Subscription;

    constructor(private nodeService: NodeService) {}

    ngOnDestroy(): void {
        this.nodeServiceSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.nodeServiceSubscription = this.nodeService.findByID(this.tree.id, this.nodeInput.id).subscribe((node: Node) => {
            this.node = node;
            console.log("form id =")
            console.log(this.node)
            console.log(this.node.type)
            console.log(this.node.formInfo.id)
        });
        console.log(Object.keys(this.previousAnswers));
        console.log("het werkt")
    }

    goToForm() {
        console.log(this.nodeInput.content)
    }

}