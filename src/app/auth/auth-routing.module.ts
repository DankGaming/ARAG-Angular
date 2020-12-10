import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsNotAuthenticatedGuard } from "./is-not-authenticated.guard";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [IsNotAuthenticatedGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
