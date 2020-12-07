import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { TreesComponent } from "./trees/trees.component";

const routes: Routes = [
	{
		path: "trees",
		component: TreesComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TreeRoutingModule {}
