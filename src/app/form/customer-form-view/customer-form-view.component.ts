import { Component, Input, OnInit } from "@angular/core";
import { Form } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { ContentType } from "src/app/node/content-type.model";
import { NodeService } from "src/app/node/node.service";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";
import { FormService } from "../form.service"

@Component({
    selector: "app-customer-form-view",
    templateUrl: "./customer-form-view.component.html",
    styleUrls: ["./customer-form-view.component.scss"],
})
export class CustomerFormViewComponent implements OnInit {
    @Input() routerLink: any[];
    @Input() tree: Tree;
    @Input() previousAnswers:{[question:number]:number};
    

    form: Form;

    constructor(private nodeService: NodeService, private formService: FormService) {}

    ngOnInit(): void {
        console.log(this.previousAnswers);
        // for (var nodeId in this.previousAnswers){
        //     this.nodeService.findByID(this.tree.id, nodeId[0]).subscribe((node: Node) => {
        //         this.node = node;
        //         this.answers = node.children;
        //         this.selectedAnswer = this.answers[0];
        // });
    }
}
