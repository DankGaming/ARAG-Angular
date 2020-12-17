import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Node } from "src/app/node/node.model";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-search-results",
	templateUrl: "./search-results.component.html",
	styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent implements OnInit {
	@Input() searchResults: {
		questions: Node[];
		notifications: Node[];
	};

	@Output() lostFocus = new EventEmitter();
	@Output() clickedInside = new EventEmitter();
	@Output() clickedOutside = new EventEmitter();

	icons = { faChevronRight };

	private clickWasInside = false;

	constructor(private route: ActivatedRoute) {}

	@HostListener("focusout")
	loseFocus(): void {
		this.lostFocus.emit();
	}

	@HostListener("click")
	clickInside(): void {
		this.clickWasInside = true;
		this.clickedInside.emit();
	}

	@HostListener("document:click")
	clickOutside(): void {
		if (!this.clickWasInside) {
			this.clickedOutside.emit();
		}
		this.clickWasInside = false;
	}

	ngOnInit(): void {}

	isActive = (question: Node): boolean =>
		+this.route.snapshot.queryParams.top === question.id;
}
