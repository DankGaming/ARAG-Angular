import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Employee } from "src/app/employee/employee.model";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	error: string;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	login(form: NgForm): void {
		if (form.invalid) return;

		const values = form.value;

		this.authService
			.login({
				email: values.email,
				password: values.password,
			})
			.subscribe(
				(employee: Employee) => {
					this.router.navigate(["/"]);
				},
				(error: HttpErrorResponse) => {
					this.error = error.error.error.message;
				}
			);
	}
}
