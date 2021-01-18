import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { EmployeeOverviewComponent } from "./employee-overview/employee-overview.component";
import { AdminGuard } from "../auth/admin.guard";

const routes: Routes = [
	{
		path: "employees/admin",
		component: EmployeeOverviewComponent,
        canActivate: [AuthGuard, AdminGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeesRoutingModule {}
