import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
	selector: "app-create-tree-modal",
	templateUrl: "./create-tree-modal.component.html",
	styleUrls: ["./create-tree-modal.component.scss"],
})
export class CreateTreeModalComponent implements OnInit {
	@Output() close = new EventEmitter<null>();
	@Output() tree = new EventEmitter<Partial<Tree>>();

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {}

	closeModal(): void {
		this.close.emit();
	}

	createTree(form: NgForm): void {
		const values = form.value;

		this.treeService
			.create({ name: values.name, description: values.description })
			.subscribe((tree: Partial<Tree>) => {
				this.treeService.treeSubject.next();
				this.tree.emit(tree);
				this.close.emit();
			});
	}
}
