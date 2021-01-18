import { Component, OnInit, ViewChild } from "@angular/core";
import { PlaceholderDirective } from "../../shared/placeholder.directive";
import { Employee } from "../employee.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../auth/auth.service";
import { EmployeeService } from "../employee.service";
import { ModalService } from "../../shared/modal.service";
import { OrderDirection } from "../../shared/http-filter";
import { SetTreeModalComponent } from "../../tree/modals/set-tree-modal/set-tree-modal.component";
import { SetEmployeeModalComponent } from "../set-employee-modal/set-employee-modal.component";

@Component({
  selector: "app-employee-overview",
  templateUrl: "./employee-overview.component.html",
  styleUrls: ["./employee-overview.component.scss"]
})
export class EmployeeOverviewComponent implements OnInit {
    @ViewChild(PlaceholderDirective, { static: false }) modalHost: PlaceholderDirective;
    employees: Employee[] = [];
    curEmployee: Employee;

    icons = { faPlus };

    constructor(
        private authService: AuthService,
        private employeeService: EmployeeService,
        private modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.curEmployee = this.authService.loginInfo.getValue().employee;
        this.fetchEmployees();
        this.employeeService.employeeSubject.subscribe(() => this.fetchEmployees());
    }

    fetchEmployees(): void {
        this.employeeService
            .findAll({
                order: "createdAt",
                orderDirection: OrderDirection.DESC,
            })
            .subscribe((employees: Employee[]) => {
                this.employees = employees;
            });
    }

    createEmployee(): void {
        this.modalService.createModal(SetEmployeeModalComponent, this.modalHost);
    }
}
