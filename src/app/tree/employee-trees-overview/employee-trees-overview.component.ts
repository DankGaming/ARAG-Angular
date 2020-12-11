import { Component, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-employee-trees-overview",
    templateUrl: "./employee-trees-overview.component.html",
    styleUrls: ["./employee-trees-overview.component.scss"],
})
export class EmployeeTreesOverviewComponent implements OnInit {
    trees: Tree[] = [];

    icons = { faPlus };

    constructor(private treeService: TreeService) {}

    ngOnInit(): void {
        this.treeService
            .findAll({ concept: true })
            .subscribe((trees: Tree[]) => {
                this.trees = trees;
            });
    }
}
