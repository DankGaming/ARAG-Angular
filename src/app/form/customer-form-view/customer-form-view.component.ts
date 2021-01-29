import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { Form } from "../form.model";
import { FormService } from "../form.service";
import { NgForm } from "@angular/forms";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { AuthService } from "src/app/auth/auth.service";
import { AlertBoxModalComponent } from "src/app/shared/modals/alert-box-modal/alert-box-modal.component";
import { HttpClient } from "@angular/common/http";
import { Target } from "@angular/compiler";
import { FormInput } from "../../form/input/form-input.model";
import { HttpResult } from "src/app/shared/http-result";

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
    previousAnswers: {[question: number]: number};
    attachments: { [name: string]: File } = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private formService: FormService,
        private modalService: ModalService,
        private authService: AuthService,
        private http: HttpClient) {}

    ngOnInit(): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;
        const params = this.activatedRoute.snapshot.params;

        this.previousAnswers = JSON.parse(atob(queryParams.answers));
        this.formService.findByID(+params.id).subscribe((form: Form) => {
            this.form = form;
        });
    }

    submitAnswers(form: NgForm): void {
        // if (!this.authService.isLoggedIn()) {
            this.formService.submit(this.form.id, {
                answers: this.previousAnswers,
				form: form.value,
				attachments: this.attachments
            }).subscribe((httpResult: HttpResult<null>) => {
				console.log("heuj")
				if (httpResult.success == true) {
					const modal = this.modalService.createModal(
						AlertBoxModalComponent,
						this.modalHost
					);
					modal.instance.title = "Melding verzonden.";
        			modal.instance.subtitle = "We gaan voor u aan de slag.";
				}
				else {
					const modal = this.modalService.createModal(
						AlertBoxModalComponent,
						this.modalHost
					);
					modal.instance.title = "Er is een fout opgetreden.";
        			modal.instance.subtitle = "Wellicht zijn niet alle velden ingevuld.";
				}
			});
        // }
    }

	handleFileInput(target: any, input: any) {
		this.attachments[input.name] = target.files.item(0);
	}
}
