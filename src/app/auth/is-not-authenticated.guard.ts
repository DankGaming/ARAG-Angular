import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { AuthGuard } from './auth.guard';
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class IsNotAuthenticatedGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree {
		const authGuard = new AuthGuard(this.authService, this.router);
		const canActivate = authGuard.canActivate(route, state) !== true
		if (!canActivate) return this.router.createUrlTree(["/"]);
		return true;
	}
}
