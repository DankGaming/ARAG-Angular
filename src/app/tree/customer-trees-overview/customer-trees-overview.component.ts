import { Component, OnInit } from "@angular/core";
import { OrderDirection } from "src/app/shared/http-filter";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";

@Component({
	selector: "app-customer-trees-overview",
	templateUrl: "./customer-trees-overview.component.html",
	styleUrls: ["./customer-trees-overview.component.scss"],
})
export class CustomerTreesOverviewComponent implements OnInit {
	trees: Tree[] = [];

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {
		this.treeService
			.findAll({
				concept: false,
				order: "createdAt",
				orderDirection: OrderDirection.DESC,
			})
			.subscribe((trees: Tree[]) => {
				this.trees = trees;
			});
	}
}
