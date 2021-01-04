import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Modal } from "../modal.interface";

@Component({
  selector: "app-confirm-box-modal",
  templateUrl: "./confirm-box-modal.component.html",
  styleUrls: ["./confirm-box-modal.component.scss"]
})
export class ConfirmBoxModalComponent implements OnInit, Modal {
  @Output() closeModal = new EventEmitter();
  @Output() confirmedAction = new EventEmitter();
  @Output() rejectedAction = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

	close = (): void => this.closeModal.emit();

  confirm(): void {
    this.close();
    this.confirmedAction.emit();
  }

  reject(): void  {
    this.close();
    this.rejectedAction.emit();
  }
}
