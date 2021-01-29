import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { Form } from "../form.model";
import { FormService } from "../form.service";
import { NgForm } from "@angular/forms";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { AuthService } from "src/app/auth/auth.service";
import { AlertBoxModalComponent } from "src/app/shared/modals/alert-box-modal/alert-box-modal.component";
import { FormInput } from "../../form/input/form-input.model";

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
        private authService: AuthService) {}

    ngOnInit(): void {
        const queryParams = this.activatedRoute.snapshot.queryParams;
        const params = this.activatedRoute.snapshot.params;

        this.previousAnswers = JSON.parse(atob(queryParams.answers));
        this.formService.findByID(+params.id).subscribe((form: Form) => {
            this.form = form;
        });
    }

    submitAnswers(form: NgForm): void {
        if (this.authService.isLoggedIn()) {
			const modal = this.modalService.createModal(
				AlertBoxModalComponent,
				this.modalHost
			);
			modal.instance.title = "Gelukt!";
			modal.instance.subtitle = "U bent ingelogd dus er wordt geen mail verzonden";
			return;
		}
		if (this.form.inputs.filter((input: FormInput) => input.type.name === "FILE").length !== Object.keys(this.attachments).length) {
			const modal = this.modalService.createModal(
				AlertBoxModalComponent,
				this.modalHost
			);
			modal.instance.title = "Er mist een bestand.";
			modal.instance.subtitle = "Controleer of u alles juist heeft ingevoerd";
			return;
		}

		this.formService.submit(this.form.id, {
			answers: this.previousAnswers,
			form: form.value,
			attachments: this.attachments
		}).subscribe(() => {
			const modal = this.modalService.createModal(
				AlertBoxModalComponent,
				this.modalHost
			);
			modal.instance.title = "Melding verzonden!";
			modal.instance.subtitle = "We gaan voor u aan de slag.";
		}, () => {
			const modal = this.modalService.createModal(
				AlertBoxModalComponent,
				this.modalHost
			);
			modal.instance.title = "Er is een fout opgetreden.";
			modal.instance.subtitle = "Wellicht heeft u een veld niet ingevoerd.";
		});
    }

	handleFileInput(target: any, input: any): void{
		this.attachments[input.name] = target.files.item(0);
	}
}
