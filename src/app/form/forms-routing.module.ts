import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { FormsOverviewComponent } from "./forms-overview/forms-overview.component";
import { FormOverviewComponent } from "./form-overview/form-overview.component";
import { CustomerFormViewComponent } from "./customer-form-view/customer-form-view.component";

const routes: Routes = [
	{
		path: "employees/forms",
		component: FormsOverviewComponent,
        canActivate: [AuthGuard, AdminGuard],
	},
    {
        path: "employees/forms/:id",
        component: FormOverviewComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FormsRoutingModule {}
