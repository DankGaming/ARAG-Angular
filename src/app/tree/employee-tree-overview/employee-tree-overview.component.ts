import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import {
	faTrashAlt,
	faAngleDoubleUp,
	faWalking,
} from "@fortawesome/free-solid-svg-icons";
import { NodeService } from "src/app/node/node.service";
import { Node } from "src/app/node/node.model";

@Component({
	selector: "app-employee-tree-overview",
	templateUrl: "./employee-tree-overview.component.html",
	styleUrls: ["./employee-tree-overview.component.scss"],
})
export class EmployeeTreeOverviewComponent implements OnInit {
	tree: Tree;

	top: {
		node: Node;
		children: Node[];
	};

	icons = {
		faTrashAlt,
		faAngleDoubleUp,
		faWalking,
	};

	constructor(
		private treeService: TreeService,
		private nodeService: NodeService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.treeService.findByID(params.id).subscribe((tree: Tree) => {
				this.tree = tree;

				this.fetchTop(tree.root?.id);
			});
		});
	}

	fetchTop(id: number): void {
		this.nodeService
			.findByID(this.tree.id, id)
			.subscribe((topNode: Node) => {
				const childNodes: Node[] = [];

				for (const child of topNode.children) {
					this.nodeService
						.findByID(this.tree.id, child.id)
						.subscribe((childNode: Node) => {
							childNodes.push(childNode);
						});
				}

				this.top = {
					node: topNode,
					children: childNodes,
				};
			});
	}

	changeTopNode(node: Node): void {
		console.log("sd");
		this.fetchTop(node.id);
	}
}
