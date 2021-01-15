import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Employee} from "../employee.model";
import {AuthService} from "../../auth/auth.service";
import {NgForm} from "@angular/forms";
import {EmployeeService} from "../employee.service";

@Component({
  selector: "app-employee-settings",
  templateUrl: "./employee-settings.component.html",
  styleUrls: ["./employee-settings.component.scss"]
})
export class EmployeeSettingsComponent implements OnInit {
    public showSuccesMessage = false;
    @Output() set = new EventEmitter<Partial<Employee>>();

    @Input() employee?: Employee;

    constructor(
        private authService: AuthService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
        this.employee = this.authService.loginInfo.getValue().employee;
     }

    update(form: NgForm): void {
        this.employeeService
            .update(this.employee.id, {...form.value})
            .subscribe((employee: Partial<Employee>) => {
                this.set.emit(employee);
                Object.assign(this.employee, employee);
            });
    }

    showMessageSucces(): void{
        this.showSuccesMessage = true;
    }
}
