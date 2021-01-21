import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { FormOverviewComponent } from "./form-overview/form-overview.component";
import { CustomerFormViewComponent } from "./customer-form-view/customer-form-view.component";

const routes: Routes = [
	{
		path: "employees/forms",
		component: FormOverviewComponent,
        canActivate: [AuthGuard, AdminGuard],
	},
	{
		path: "customers/forms/form.id",
		component: CustomerFormViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FormsRoutingModule {}
