import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerTreesOverviewComponent } from "./customer-trees-overview/customer-trees-overview.component";
import { TreeRunComponent } from "./tree-run/tree-run.component";
import { TreesComponent } from "./trees/trees.component";

const routes: Routes = [
	{
		path: "trees",
		component: TreesComponent,
	},
	{
		path: "customer/trees",
		component: CustomerTreesOverviewComponent,
	},
	{
		path: "customer/tree/:id",
		component: TreeRunComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TreeRoutingModule {}
