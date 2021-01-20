import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../shared/modal.service";
import { Form } from "../form.model";
import { SetFormModalComponent } from "../modals/set-form-modal/set-form-modal.component";

@Component({
  selector: "app-form-row",
  templateUrl: "./form-row.component.html",
  styleUrls: ["./form-row.component.scss"]
})
export class FormRowComponent implements OnInit {
    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;

    @Input() form: Form;
    @Input() navigationLink: any[];

    icons = { faArrowRight };

    constructor(
        private modalService: ModalService
    ) {}

    ngOnInit(): void {}

    editForm(): void {
        const modal = this.modalService.createModal(SetFormModalComponent, this.modalHost);
        modal.instance.form = this.form;
    }
}
