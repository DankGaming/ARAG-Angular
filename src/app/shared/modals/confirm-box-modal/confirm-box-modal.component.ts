import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Modal } from "../modal.interface";

@Component({
	selector: "app-confirm-box-modal",
	templateUrl: "./confirm-box-modal.component.html",
	styleUrls: ["./confirm-box-modal.component.scss"],
})
export class ConfirmBoxModalComponent implements OnInit, Modal {
    @Input() title: string = "Weet u het zeker?";
    @Input() description: string;
	@Output() closeModal = new EventEmitter();
	@Output() confirmed = new EventEmitter();
    @Output() rejected = new EventEmitter();
    constructor() {}

	ngOnInit(): void {}

	close = (): void => this.closeModal.emit();

	confirm(): void {
		this.close();
		this.confirmed.emit();
	}

	reject(): void {
		this.close();
		this.rejected.emit();
	}
}
