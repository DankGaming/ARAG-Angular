import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/auth/login-info.model";
import { Employee } from "src/app/employee/employee.model";

@Component({
	selector: "app-employee-navigation",
	templateUrl: "./employee-navigation.component.html",
	styleUrls: ["./employee-navigation.component.scss"],
})
export class EmployeeNavigationComponent implements OnInit {
	employee: Employee;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.loginInfo.subscribe((loginInfo: LoginInfo) => {
			if (loginInfo?.employee) this.employee = loginInfo.employee;
		});
	}
}
