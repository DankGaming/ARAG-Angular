import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CustomerTreesOverviewComponent } from "./customer-trees-overview/customer-trees-overview.component";
import { EmployeeTreeOverviewComponent } from "./employee-tree-overview/employee-tree-overview.component";
import { EmployeeTreesOverviewComponent } from "./employee-trees-overview/employee-trees-overview.component";
import { TreeRunComponent } from "./tree-run/tree-run.component";

const routes: Routes = [
	{
		path: "",
		component: CustomerTreesOverviewComponent,
	},
	{
		path: "customers/trees",
		component: CustomerTreesOverviewComponent,
	},
	{
		path: "customers/trees/:id",
		component: TreeRunComponent,
	},
	{
		path: "employees/trees",
		component: EmployeeTreesOverviewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "employees/trees/:id",
		component: EmployeeTreeOverviewComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TreeRoutingModule {}
