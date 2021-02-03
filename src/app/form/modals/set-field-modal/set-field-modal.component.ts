import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { FormInput, FormInputType } from "../../input/form-input.model";
import { Form } from "../../form.model";
import { FormInputService } from "../../input/form-input.service";


@Component({
  	selector: "app-set-field-modal",
  	templateUrl: "./set-field-modal.component.html",
  	styleUrls: ["./set-field-modal.component.scss"]
})
export class SetFieldModalComponent implements OnInit, Modal {
	@Input() form: Form;
	@Input() formInput?: FormInput;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<FormInput>>();

	formInputTypes: FormInputType[];

	type: { name: string; id: number };

	constructor(private formInputService: FormInputService) { }

	ngOnInit(): void {
		this.fetchFormInputTypes();
	  }

	close(): void {
		this.closeModal.emit();
	}

	fetchFormInputTypes(): void {
		this.formInputService
			.findAllFormInputTypes()
			.subscribe((formInputTypes: FormInputType[]) => {
				this.formInputTypes = formInputTypes;
				this.type =
					this.formInputTypes.find(
					(type) => type.id === this.formInput?.type?.id
				) ?? this.formInputTypes[0];
			});
	}

	create(form: NgForm): void {
		const values = form.value;

		this.formInputService
			.create(this.form.id, {
				name: values.name,
				description: values.description,
				type: values.type.id,
			})
			.subscribe((input: Partial<FormInput>) => {
				this.set.emit(input);
				this.close();
				this.formInputService.formSubject.next();
			});
	  }

	update(form: NgForm): void {
		const values = form.value;

		this.formInputService
			.update(this.form.id, this.formInput.id, {
				name: values.name,
				description: values.description,
				type: values.type.id,
		})
			.subscribe((input: Partial<FormInput>) => {
				this.set.emit(input);
				this.close();
				Object.assign(this.formInput, input);
				this.formInputService.formSubject.next();
		});
	}

	remove(): void {
		this.formInputService.remove(this.form.id, this.formInput.id).subscribe(() => {
			this.formInputService.formSubject.next();
		});
		this.close();
	}
}
