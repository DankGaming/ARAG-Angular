import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-confirm-box-modal",
  templateUrl: "./confirm-box-modal.component.html",
  styleUrls: ["./confirm-box-modal.component.scss"]
})
export class ConfirmBoxModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
		this.closeModal.emit();
	}
}
