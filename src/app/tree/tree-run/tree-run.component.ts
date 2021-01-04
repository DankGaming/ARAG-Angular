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
    hasRoot = false;
    rootTypeQuestion = false;

    constructor(private activatedRoute: ActivatedRoute, private treeService: TreeService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            
            this.treeService.findByID(+params.id).subscribe((tree: Tree) => {
                this.tree = tree;

                if (this.tree.root?.type === ContentType.QUESTION) {
                    this.rootTypeQuestion = true;
                    this.hasRoot = true;
                }
                else if (this.tree.root?.type === ContentType.NOTIFICATION) {
                    this.rootTypeQuestion = false;
                    this.hasRoot = true;
                }
            });
        });
    }
}
