import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Tree } from "../../tree/tree.model";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Employee } from "../employee.model";
import { ModalService } from "../../shared/modal.service";
import { SetEmployeeModalComponent } from "../set-employee-modal/set-employee-modal.component";
import { PlaceholderDirective } from "../../shared/placeholder.directive";

@Component({
  selector: "app-employee-row",
  templateUrl: "./employee-row.component.html",
  styleUrls: ["./employee-row.component.scss"]
})
export class EmployeeRowComponent implements OnInit {
    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;

    @Input() employee: Employee;
    @Input() navigationLink: any[];

    icons = { faArrowRight };

    constructor(
        private modalService: ModalService
    ) {}

    ngOnInit(): void {}

    editEmployee(): void {
        const modal = this.modalService.createModal(SetEmployeeModalComponent, this.modalHost);
        modal.instance.employee = this.employee;
    }
}
