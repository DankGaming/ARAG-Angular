import { Component, Input, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ContentType } from "src/app/node/content-type.model";

@Component({
    selector: "app-tree-run",
    templateUrl: "./tree-run.component.html",
    styleUrls: ["./tree-run.component.scss"],
})
export class TreeRunComponent implements OnInit {
    @Input() routerLink: any[];

    tree: Tree;
    type: string;

    constructor(private activatedRoute: ActivatedRoute, private treeService: TreeService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {

            this.treeService.findByID(+params.id).subscribe((tree: Tree) => {
                this.tree = tree;
            });
        });
    }

    hasRoot(): boolean {
        return this.tree.root != null;
    }

    rootNodeIsQuestion(): boolean {
        return this.tree.root?.type === ContentType.QUESTION;
    }
}
