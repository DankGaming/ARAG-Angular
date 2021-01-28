import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { FormInput } from "../../input/form-input.model";
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
	@Output() set = new EventEmitter<Partial<Form>>();

	types = [
		{ name: "Tekstveld", value: 1 },
		{ name: "Bestandveld", value: 2 },
	];
	type: { name: string; value: number };

	constructor(
	private formInputService: FormInputService,
	) { }

	ngOnInit(): void {
		this.type =
		this.types.find(
			(type) => type.value === this.formInput?.type?.id
		) ?? this.types[0];
	  }

	close(): void {
		this.closeModal.emit();
	}

	create(form: NgForm): void {
		const values = form.value;

		this.formInputService
			.create(this.form.id, {
				name: values.name,
				description: values.description,
				type: values.type.value,
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
		type: values.type.value,
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
