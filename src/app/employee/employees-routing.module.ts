import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { EmployeeOverviewComponent } from "./employee-overview/employee-overview.component";
import { AdminGuard } from "../auth/admin.guard";
import {EmployeeSettingsComponent} from "./employee-settings/employee-settings.component";

const routes: Routes = [
	{
		path: "employees/admin",
		component: EmployeeOverviewComponent,
        canActivate: [AuthGuard, AdminGuard],
	},
    {
        path: "employees/settings",
        component: EmployeeSettingsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeesRoutingModule {}
