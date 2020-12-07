import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreesComponent } from "./trees/trees.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { TreeRoutingModule } from "./trees-routing.module";

@NgModule({
	declarations: [TreesComponent],
	imports: [CommonModule, RouterModule, TreeRoutingModule, SharedModule],
})
export class TreeModule {}
