import { Component, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OrderDirection } from "src/app/shared/http-filter";

@Component({
	selector: "app-employee-trees-overview",
	templateUrl: "./employee-trees-overview.component.html",
	styleUrls: ["./employee-trees-overview.component.scss"],
})
export class EmployeeTreesOverviewComponent implements OnInit {
	trees: Tree[] = [];
	showCreateTreeModal = false;

	icons = { faPlus };

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {
		this.fetchTrees();

		this.treeService.treeSubject.subscribe(() => this.fetchTrees());
	}

	fetchTrees(): void {
		this.treeService
			.findAll({
				concept: true,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((trees: Tree[]) => {
				this.trees = trees;
			});
	}
}
