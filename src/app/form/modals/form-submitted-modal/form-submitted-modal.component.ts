import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Form } from "../../form.model";
import { FormService } from "../../form.service";


@Component({
  selector: "app-form-submitted-modal",
  templateUrl: "./form-submitted-modal.component.html",
  styleUrls: ["./form-submitted-modal.component.scss"]
})
export class FormSubmittedModalComponent implements OnInit, Modal {
  @Output() closeModal = new EventEmitter();

  @Input() form: Form;


  constructor(
    private formService: FormService,
    )  { }


  ngOnInit(): void {
  }

  close(): void {
    this.closeModal.emit();
  }
}
