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
    rootTypeNotification = false;

    
    @Input() routerLink: any[];
    

    constructor(private activatedRoute: ActivatedRoute, private treeService: TreeService) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['id']
        });

        this.treeService.findByID(this.id).subscribe((tree: Tree) => {
            this.tree = tree;
            console.log((this.tree.root.type));
            
            if (this.tree.root.type = ContentType.QUESTION) {
                this.rootTypeQuestion = true;
                console.log('er is wel een vervolgvraag'); //This will be executed
            }
            else if (this.tree.root.type = ContentType.NOTIFICATION) {
                console.log('er is wel een vervolgnotificatie'); //This will be executed
                this.rootTypeNotification = true;
            }
            else if (this.tree.root.type = ContentType.ANSWER) {
                console.log('er is wel een vervolgantwoord'); //This will be executed
            }
        });
        
        
    
}}