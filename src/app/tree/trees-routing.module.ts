import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CustomerTreesOverviewComponent } from "./customer-trees-overview/customer-trees-overview.component";
import { EmployeeTreesOverviewComponent } from "./employee-trees-overview/employee-trees-overview.component";
import { TreeRunComponent } from "./tree-run/tree-run.component";
import { TreesComponent } from "./trees/trees.component";

const routes: Routes = [
	{
		path: "",
		component: CustomerTreesOverviewComponent,
	},
	{
		path: "customer/trees",
		component: CustomerTreesOverviewComponent,
	},
	{
		path: "customer/tree/:id",
		component: TreeRunComponent,
	},
	{
		path: "employee/trees",
		component: EmployeeTreesOverviewComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TreeRoutingModule {}
