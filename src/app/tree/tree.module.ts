import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreesComponent } from "./trees/trees.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { TreeRoutingModule } from "./trees-routing.module";
import { CustomerTreesOverviewComponent } from "./customer-trees-overview/customer-trees-overview.component";
import { TreeRowComponent } from "./tree-row/tree-row.component";
import { TreeRunComponent } from "./tree-run/tree-run.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        TreesComponent,
        CustomerTreesOverviewComponent,
        TreeRowComponent,
        TreeRunComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        TreeRoutingModule,
        SharedModule,
        FontAwesomeModule,
    ],
})
export class TreeModule {}
