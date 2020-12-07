import { Component, Input, OnInit } from "@angular/core";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

@Component({
	selector: "app-error-box",
	templateUrl: "./error-box.component.html",
	styleUrls: ["./error-box.component.scss"],
})
export class ErrorBoxComponent implements OnInit {
    @Input() message: string;

    icons = {
        faExclamationTriangle: faExclamationTriangle
    }

	constructor() {}

	ngOnInit(): void {}
}
