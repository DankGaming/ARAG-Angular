import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../shared/modal.service";
import { Form } from "../form.model";
import { SetFormModalComponent } from "../modals/set-form-modal/set-form-modal.component";
import { Node } from "../../node/node.model";

@Component({
  selector: "app-forms-row",
  templateUrl: "./forms-row.component.html",
  styleUrls: ["./forms-row.component.scss"]
})
export class FormsRowComponent implements OnInit {
    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;

    @Input() form: Form;
    @Input() navigationLink: any[];

    icons = { faArrowRight };

    constructor(
        private modalService: ModalService
    ) {}

    ngOnInit(): void {}
}
