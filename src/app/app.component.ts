import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { LoginInfo } from "./auth/login-info.model";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	isLoggedIn: boolean = false;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.autoLogin();
		this.authService.loginInfo.subscribe(
			(loginInfo: LoginInfo) => (this.isLoggedIn = loginInfo != null)
		);
	}
}
