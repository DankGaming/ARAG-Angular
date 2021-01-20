import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Role } from "../employee/employee.model";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        const isAdmin = this.authService.loginInfo.getValue().employee.role === Role.ADMIN;
        if (!isAdmin) return this.router.createUrlTree(["/employees", "trees"]);
        return true;
    }
}
