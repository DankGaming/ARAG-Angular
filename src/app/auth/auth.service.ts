import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import { Employee } from "../employee/employee.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	loginInfo: BehaviorSubject<LoginInfo> = new BehaviorSubject<LoginInfo>(
		null
	);

	constructor(private http: HttpClient) {}

	logout() {
		this.loginInfo.next(null);
		localStorage.removeItem("loginInfo");
	}

	login(dto: LoginDTO): Observable<Employee> {
		const observer: Observable<Employee> = this.http
			.post<Employee>("/auth/login", {
				email: dto.email,
				password: dto.password,
			})
			.pipe(
				map((response: any) => response.result),
				tap((loginInfo: LoginInfo) => {
					this.handleAuthentication(loginInfo);
				}),
				map((loginInfo: LoginInfo) => loginInfo.employee)
			);
		return observer;
	}

	private handleAuthentication(loginInfo: LoginInfo) {
		this.loginInfo.next(loginInfo);
		localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
	}

	isLoggedIn() {
		return !!this.loginInfo.getValue();
	}

	autoLogin(): void {
		let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
		if (!loginInfo) return;
		this.loginInfo.next(loginInfo);
	}
}
