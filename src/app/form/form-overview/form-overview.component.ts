import { Component, OnInit, ViewChild } from "@angular/core";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { Employee } from "../../employee/employee.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../auth/auth.service";
import { ModalService } from "../../shared/modal.service";
import { OrderDirection } from "../../shared/http-filter";
import { FormService } from "../form.service";
import { Form } from "../form.model";
import { SetFormModalComponent } from "../modals/set-form-modal/set-form-modal.component";

@Component({
  selector: "app-form-overview",
  templateUrl: "./form-overview.component.html",
  styleUrls: ["./form-overview.component.scss"]
})
export class FormOverviewComponent implements OnInit {
    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;
    forms: Form[] = [];
    curEmployee: Employee;

    icons = { faPlus };

    constructor(
        private authService: AuthService,
        private formService: FormService,
        private modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.curEmployee = this.authService.loginInfo.getValue().employee;
        this.fetchForms();
        this.formService.formSubject.subscribe(() => this.fetchForms());
    }

    fetchForms(): void {
        this.formService
            .findAll({
                order: "createdAt",
                orderDirection: OrderDirection.DESC,
            })
            .subscribe((forms: Form[]) => {
                this.forms = forms;
            });
    }

    createForm(): void {
        this.modalService.createModal(SetFormModalComponent, this.modalHost);
    }
}
