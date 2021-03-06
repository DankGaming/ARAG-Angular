import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Tree } from "../tree.model";
import { TreeService } from "../tree.service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OrderDirection } from "src/app/shared/http-filter";
import { AuthService } from "src/app/auth/auth.service";
import { Employee } from "src/app/employee/employee.model";
import { SetTreeModalComponent } from "../modals/set-tree-modal/set-tree-modal.component";
import { PlaceholderDirective } from "src/app/shared/placeholder.directive";
import { ModalService } from "src/app/shared/modal.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-employee-trees-overview",
	templateUrl: "./employee-trees-overview.component.html",
	styleUrls: ["./employee-trees-overview.component.scss"],
})
export class EmployeeTreesOverviewComponent implements OnInit, OnDestroy {
	@ViewChild(PlaceholderDirective, { static: false })
	modalHost: PlaceholderDirective;
	trees: Tree[] = [];
	employee: Employee;
	showCreateTreeModal = false;

	icons = { faPlus };

	private treeSubjectSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private treeService: TreeService,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.employee = this.authService.loginInfo.getValue().employee;
		this.fetchTrees();
		this.treeSubjectSubscription = this.treeService.treeSubject.subscribe(
			() => this.fetchTrees()
		);
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

	createTree(): void {
		this.modalService.createModal(SetTreeModalComponent, this.modalHost);
	}

	ngOnDestroy(): void {
		this.treeSubjectSubscription.unsubscribe();
	}
}
