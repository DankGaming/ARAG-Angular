import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Employee } from "src/app/employee/employee.model";
import { AuthService } from "../auth.service";
import { LoginInfo } from "../login-info.model";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	login(form: NgForm): void {
		if (form.invalid) return;

		const values = form.value;

		this.authService
			.login({
				email: values.email,
				password: values.password,
			})
			.subscribe((employee: Employee) => {
				console.log(employee);
			});
	}
}
