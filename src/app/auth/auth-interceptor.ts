import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpParams,
} from "@angular/common/http";
import { Observable, ObservableInput } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { LoginInfo } from "./login-info.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return this.authService.loginInfo.pipe(
			take(1),
			exhaustMap((loginInfo: LoginInfo) => {
				if (!loginInfo?.jwt) return next.handle(req);

				const modifiedReq = req.clone({
					params: new HttpParams().set(
						"Authorization",
						`Bearer ${loginInfo.jwt}`
					),
				});
				return next.handle(modifiedReq);
			})
		);
	}
}
