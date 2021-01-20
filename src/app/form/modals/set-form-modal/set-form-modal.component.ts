import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Form } from "../../form.model";
import { FormService } from "../../form.service";


@Component({
  selector: "app-set-form-modal",
  templateUrl: "./set-form-modal.component.html",
  styleUrls: ["./set-form-modal.component.scss"]
})
export class SetFormModalComponent implements OnInit, Modal {
  @Output() set = new EventEmitter<Partial<Form>>();
  @Output() closeModal = new EventEmitter();

  @Input() form?: Form;


  constructor(
    private formService: FormService,
    )  { }


  ngOnInit(): void {
  }

  close(): void {
    this.closeModal.emit();
  }


  create(form: NgForm): void {
		this.formService
    .create({...form.value})
		.subscribe((form: Partial<Form>) => {
      this.set.emit(form);
      this.close();
      this.formService.formSubject.next();
			});
  }


  update(form: NgForm): void {
    this.formService
    .update(this.form.id, {...form.value})
    .subscribe((employee: Partial<Form>) => {
        this.set.emit(employee);
        this.close();
        Object.assign(this.form, employee);
    });
  }

  remove(): void {
    this.formService.remove(this.form.id).subscribe(() => {
      this.formService.formSubject.next();
    });
    this.close();
  }
}
