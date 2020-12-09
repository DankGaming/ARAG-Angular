import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/auth/login-info.model";
import { Employee, Role } from "src/app/employee/employee.model";
import { Router } from "@angular/router";

@Component({
	selector: "app-employee-navigation",
	templateUrl: "./employee-navigation.component.html",
	styleUrls: ["./employee-navigation.component.scss"],
})
export class EmployeeNavigationComponent implements OnInit {
	employee: Employee;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		const loginInfo = this.authService.loginInfo.getValue();
		if (loginInfo?.employee) this.employee = loginInfo.employee;
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(["login"]);
	}

	isAdmin = () => this.employee.role == Role.ADMIN;
}
