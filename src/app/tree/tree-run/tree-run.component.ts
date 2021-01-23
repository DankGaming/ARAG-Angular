import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { ActivatedRoute, Params } from "@angular/router";
import { ContentType } from "src/app/node/content-type.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-tree-run",
    templateUrl: "./tree-run.component.html",
    styleUrls: ["./tree-run.component.scss"],
})
export class TreeRunComponent implements OnInit {
    @Input() routerLink: any[];

    tree: Tree;
    type: string;
    previousAnswers: {[question: number]: number} = {};

    activatedRouteSubscription: Subscription;
    treeServiceSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private treeService: TreeService) {}

    ngOnDestroy(): void {
        this.activatedRouteSubscription.unsubscribe();
        this.treeServiceSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {
            this.treeServiceSubscription = this.treeService.findByID(+params.id).subscribe((tree: Tree) => {
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

    rootNodeIsNotification(): boolean {
        return this.tree.root?.type === ContentType.NOTIFICATION;
    }

    rootNodeIsForm(): boolean {
        return this.tree.root?.type === ContentType.FORM;
    }
}
