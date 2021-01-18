import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Employee, Role } from "../employee.model";
import { EmployeeService } from "../employee.service";
import { Node } from "../../node/node.model";

@Component({
  selector: "app-set-employee-modal",
  templateUrl: "./set-employee-modal.component.html",
  styleUrls: ["./set-employee-modal.component.scss"]
})
export class SetEmployeeModalComponent implements OnInit {

    constructor(private employeeService: EmployeeService) {}
    @Output() closeModal = new EventEmitter();
    @Output() set = new EventEmitter<Partial<Employee>>();

    @Input() employee?: Employee;

    roles = Object.values(Role);

    ngOnInit(): void {}

    close = (): void => this.closeModal.emit();

    create(form: NgForm): void {
        this.employeeService
            .create({...form.value})
            .subscribe((employee: Partial<Employee>) => {
                this.set.emit(employee);
                this.close();
                this.employeeService.employeeSubject.next();
            });
    }

    update(form: NgForm): void {
        this.employeeService
            .update(this.employee.id, {...form.value})
            .subscribe((employee: Partial<Employee>) => {
                this.set.emit(employee);
                this.close();
                Object.assign(this.employee, employee);
            });
    }
}
