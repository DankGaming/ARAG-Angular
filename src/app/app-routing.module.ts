import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { TreesComponent } from "./employee/trees/trees.component";

const routes: Routes = [
	{
		path: "",
		component: TreesComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
