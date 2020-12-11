import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
	selector: "app-create-tree-modal",
	templateUrl: "./create-tree-modal.component.html",
	styleUrls: ["./create-tree-modal.component.scss"],
})
export class CreateTreeModalComponent implements OnInit {
	@Output() closeModal = new EventEmitter<null>();
	@Output() tree = new EventEmitter<Partial<Tree>>();

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
	}

	createTree(form: NgForm): void {
		const values = form.value;

		this.treeService
			.create({
				name: values.name,
				description: values.description,
			})
			.subscribe((tree: Partial<Tree>) => {
				this.tree.emit(tree);
				this.closeModal.emit();
				this.treeService.treeSubject.next();
			});
	}
}
