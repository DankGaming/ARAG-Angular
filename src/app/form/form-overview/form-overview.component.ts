import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
	faAngleDoubleUp,
	faArrowLeft,
	faPen,
	faPlus,
	faSearch,
	faTrashAlt,
	faWalking,
} from "@fortawesome/free-solid-svg-icons";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { Form } from "../form.model";
import { Employee } from "../../employee/employee.model";
import { AuthService } from "../../auth/auth.service";
import { FormService } from "../form.service";
import { ModalService } from "../../shared/modal.service";
import { OrderDirection } from "../../shared/http-filter";
import { SetFormModalComponent } from "../modals/set-form-modal/set-form-modal.component";
import { FormInput } from "../input/form-input.model";
import { FormInputService } from "../input/form-input.service";
import { SetFieldModalComponent } from "../modals/set-field-modal/set-field-modal.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { skip } from "rxjs/operators";
import { Subscription } from "rxjs";
import { ConfirmBoxModalComponent } from "../../shared/modals/confirm-box-modal/confirm-box-modal.component";
import { AlertBoxModalComponent } from "src/app/shared/modals/alert-box-modal/alert-box-modal.component";

@Component({
	selector: "app-form-overview",
	templateUrl: "./form-overview.component.html",
	styleUrls: ["./form-overview.component.scss"],
})
export class FormOverviewComponent implements OnInit, OnDestroy {
	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;
	formInputs: FormInput[] = [];
	curEmployee: Employee;
	form: Form;

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
		faArrowLeft,
		faPen,
		faPlus,
		faSearch,
	};

	private formSubjectSubscription: Subscription;
	private formInputSubjectSubscription: Subscription;

	private params: Params;

	constructor(
		private authService: AuthService,
		private formService: FormService,
		private formInputService: FormInputService,
		private modalService: ModalService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		// Set initial values
		this.params = this.route.snapshot.params;

		// Subscribe to changes
		this.route.params.pipe(skip(1)).subscribe((params: Params) => {
			this.params = params;
			this.refresh();
		});
		// Subscribe to changes on tree so you can immediately see changes
		this.formSubjectSubscription = this.formService.formSubject.subscribe(
			() => this.refresh()
		);

		this.formInputSubjectSubscription = this.formInputService.formSubject.subscribe(
			() => {
				this.refresh();
			}
		);
		// Fetch tree and nodes for the first time
		this.refresh();
	}

	refresh(): void {
		this.formService.findByID(this.params.id).subscribe((form: Form) => {
			this.form = form;
			this.fetchFormInputs();
		});
	}

	fetchFormInputs(): void {
		this.formInputService
			.findAll(this.form.id, {
				order: "createdAt",
				orderDirection: OrderDirection.ASC,
			})
			.subscribe((formInputs: FormInput[]) => {
				this.formInputs = formInputs;
			});
	}

	createFormInput(): void {
		const modal = this.modalService.createModal(
			SetFieldModalComponent,
			this.modalHost
		);
		modal.instance.form = this.form;
	}

	editForm(): void {
		const modal = this.modalService.createModal(
			SetFormModalComponent,
			this.modalHost
		);
		modal.instance.form = this.form;
	}

	removeForm(): void {
		const modal = this.modalService.createModal(
			ConfirmBoxModalComponent,
			this.modalHost
		);
		modal.instance.description = `U staat op het punt om het formulier '${this.form.name}'
		te verwijderen. Deze actie kan niet ongedaan worden. Weet u het zeker?`;
		modal.instance.confirmed.subscribe(() => {
			this.formService.remove(this.form.id).subscribe(
				() => {
					this.router.navigate([".."], {
						relativeTo: this.route,
					});
				},
				() => {
					const alertModal = this.modalService.createModal(
						AlertBoxModalComponent,
						this.modalHost
					);
					alertModal.instance.title = "Er is iets fout gegaan";
					alertModal.instance.body =
						"Dit meldformulier wordt gebruikt in beslissingsbomen. Verwijder de koppeling voordat u dit meldformulier verwijderd.";
				}
			);
		});
	}

	ngOnDestroy(): void {
		this.formSubjectSubscription.unsubscribe();
		this.formInputSubjectSubscription.unsubscribe();
	}
}
