import { Component, Input, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Identifiers } from "@angular/compiler";
import { ContentType } from "src/app/node/content-type.model";
import { Node } from "src/app/node/node.model";


@Component({
    selector: "app-tree-run",
    templateUrl: "./tree-run.component.html",
    styleUrls: ["./tree-run.component.scss"],
})
export class TreeRunComponent implements OnInit {
    tree: Tree;
    id: number;
    type: String;
    rootTypeQuestion = false;

    
    @Input() routerLink: any[];
    

    constructor(private activatedRoute: ActivatedRoute, private treeService: TreeService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['id']
        });

        this.treeService.findByID(this.id).subscribe((tree: Tree) => {
            this.tree = tree;
            
            if (this.tree.root.type = ContentType.QUESTION) {
                this.rootTypeQuestion = true;
            }
            else if (this.tree.root.type = ContentType.NOTIFICATION) {
                this.rootTypeQuestion = false;
            }
        });
    }
}