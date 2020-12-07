import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, RouterModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
