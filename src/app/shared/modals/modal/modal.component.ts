import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
	@Input() title: string;
	@Input() subtitle: string;
	@Output() close = new EventEmitter<null>();

	icons = { faTimesCircle };

	constructor(private element: ElementRef) {}

	ngOnInit(): void {}

	closeModal(): void {
		this.close.emit();
	}
}
