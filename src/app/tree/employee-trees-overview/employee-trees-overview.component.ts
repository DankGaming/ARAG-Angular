import { Component, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OrderDirection } from "src/app/shared/http-filter";
import { AuthService } from "src/app/auth/auth.service";
import { Employee } from "src/app/employee/employee.model";

@Component({
	selector: "app-employee-trees-overview",
	templateUrl: "./employee-trees-overview.component.html",
	styleUrls: ["./employee-trees-overview.component.scss"],
})
export class EmployeeTreesOverviewComponent implements OnInit {
	trees: Tree[] = [];
	employee: Employee;
	showCreateTreeModal = false;

	icons = { faPlus };

	constructor(
		private authService: AuthService,
		private treeService: TreeService
	) {}

	ngOnInit(): void {
		this.employee = this.authService.loginInfo.getValue().employee;
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
