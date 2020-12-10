import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";
import { Employee, Role } from "src/app/employee/employee.model";

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

    async logout(): Promise<void> {
        this.authService.logout();
        await this.router.navigate(["login"]);
    }

    isAdmin = (): boolean => this.employee.role === Role.ADMIN;
}
