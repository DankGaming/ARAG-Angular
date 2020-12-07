import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import { Employee } from "../employee/employee.model";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	user: Subject<Employee> = new Subject<Employee>();

	constructor(private http: HttpClient) {}

	logout() {
		this.user.next(null);
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
		this.user.next(loginInfo.employee);
		localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
	}
}
