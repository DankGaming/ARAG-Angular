import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
	@Input() title: string;
	@Input() subtitle: string;
	@Input() showBody: boolean = true;
	@Input() showFooter: boolean = true;
	@Output() closeModal = new EventEmitter<null>();

	icons = { faTimesCircle };

	constructor() {}

	ngOnInit(): void {
		console.log();
	}

	close(): void {
		this.closeModal.emit();
	}
}
