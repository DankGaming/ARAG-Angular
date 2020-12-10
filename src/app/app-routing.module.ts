import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TreesComponent } from "./tree/trees/trees.component";

const routes: Routes = [
    {
        path: "",
        component: TreesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
