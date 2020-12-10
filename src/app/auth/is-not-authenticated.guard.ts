import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class IsNotAuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        const authGuard = new AuthGuard(this.authService, this.router);
        const canActivate = authGuard.canActivate() !== true;
        if (!canActivate) return this.router.createUrlTree(["/"]);
        return true;
    }
}
