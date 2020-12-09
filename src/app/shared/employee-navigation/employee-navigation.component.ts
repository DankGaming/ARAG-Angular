import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/auth/login-info.model";
import { Employee, Role } from "src/app/employee/employee.model";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
	selector: "app-employee-navigation",
	templateUrl: "./employee-navigation.component.html",
	styleUrls: ["./employee-navigation.component.scss"],
})
export class EmployeeNavigationComponent implements OnInit {
	employee: Employee;

	icons = {
		faChevronDown: faChevronDown,
	};

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.authService.loginInfo.subscribe((loginInfo: LoginInfo) => {
			if (loginInfo?.employee) this.employee = loginInfo.employee;
		});
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(["login"]);
	}

	isAdmin(): boolean {
		return this.employee.role == Role.ADMIN;
	}
}
