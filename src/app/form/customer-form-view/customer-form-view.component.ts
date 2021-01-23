import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { ContentType } from "src/app/node/content-type.model";
import { NodeService } from "src/app/node/node.service";
import { Form } from "../form.model";
import { Tree } from "src/app/tree/tree.model";
import { FormService } from "../form.service"
import { NgForm } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { FormSubmittedModalComponent } from "../modals/form-submitted-modal/form-submitted-modal.component";

@Component({
    selector: "app-customer-form-view",
    templateUrl: "./customer-form-view.component.html",
    styleUrls: ["./customer-form-view.component.scss"],
})
export class CustomerFormViewComponent implements OnInit {
    @Input() routerLink: any[];

    @ViewChild(PlaceholderDirective, { static: false })
    modalHost: PlaceholderDirective;
    
    form: Form;
    previousAnswers:{[question:number]:number};

    constructor(private activatedRoute: ActivatedRoute, private nodeService: NodeService, private formService: FormService, private modalService: ModalService) {} 

    ngOnInit(): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;
        const params = this.activatedRoute.snapshot.params;

        this.previousAnswers = JSON.parse(atob(queryParams.answers));
        this.formService.findByID(+params.id).subscribe((form: Form) => {
            this.form = form;
        });
    }

    submitAnswers(form: NgForm) {
        this.formService.submit(this.form.id, {
            answers: this.previousAnswers,
            form: form.value
        }).subscribe();
        this.modalService.createModal(FormSubmittedModalComponent, this.modalHost);
    }
}
