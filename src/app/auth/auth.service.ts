import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(dto: LoginDTO) {
		const observer = this.http.post<LoginInfo>("/auth/login", {
			email: dto.email,
			password: dto.password,
		});
		return observer;
	}
}
