import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { ModalService } from "../../shared/modal.service";
import { FormInput } from "../input/form-input.model";
import { SetFieldModalComponent } from "../modals/set-field-modal/set-field-modal.component";
import { Form } from "../form.model";

@Component({
	selector: "app-form-row",
	templateUrl: "./form-row.component.html",
	styleUrls: ["./form-row.component.scss"],
})
export class FormRowComponent implements OnInit {
	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;

	@Input() form: Form;
	@Input() input: FormInput;
	@Input() navigationLink: any[];

	icons = {
		faPen,
	};

	constructor(private modalService: ModalService) {}

	ngOnInit(): void {}

	editFormInput(): void {
		const modal = this.modalService.createModal(
			SetFieldModalComponent,
			this.modalHost
		);
		modal.instance.form = this.form;
		modal.instance.formInput = this.input;
	}
}
