import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule,
		AuthRoutingModule,
		SharedModule,
		FormsModule,
	],
})
export class AuthModule {}
