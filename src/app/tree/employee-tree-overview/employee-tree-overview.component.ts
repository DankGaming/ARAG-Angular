import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import {
	faTrashAlt,
	faAngleDoubleUp,
	faWalking,
} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-employee-tree-overview",
	templateUrl: "./employee-tree-overview.component.html",
	styleUrls: ["./employee-tree-overview.component.scss"],
})
export class EmployeeTreeOverviewComponent implements OnInit {
	tree: Tree;

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
	};

	constructor(
		private treeService: TreeService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.treeService.findByID(params.id).subscribe((tree: Tree) => {
				this.tree = tree;
			});
		});
	}
}
