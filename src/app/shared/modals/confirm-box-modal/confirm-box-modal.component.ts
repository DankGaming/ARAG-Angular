import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Modal } from "../modal.interface";

@Component({
  selector: "app-confirm-box-modal",
  templateUrl: "./confirm-box-modal.component.html",
  styleUrls: ["./confirm-box-modal.component.scss"]
})
export class ConfirmBoxModalComponent implements OnInit, Modal {
  @Output() closeModal = new EventEmitter<null>();
  @Output() confirmedAction = new EventEmitter<null>();
  @Output() rejectedAction = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
		this.closeModal.emit();
  }

  confirm(): void {
    this.closeModal.emit();
    this.confirmedAction.emit();
  }

  reject(): void  {
    this.closeModal.emit();
    this.confirmedAction.emit();
  }
}