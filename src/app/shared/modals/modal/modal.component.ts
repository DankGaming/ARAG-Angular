import { Component, ElementRef, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
	@Input() title: string;
	@Input() subtitle: string;
	@Input() show: boolean;

	constructor(private element: ElementRef) {}

	ngOnInit(): void {}

	close(): void {
		this.show = false;
	}
}
