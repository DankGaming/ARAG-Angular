import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
	selector: "app-set-tree-modal",
	templateUrl: "./set-tree-modal.component.html",
	styleUrls: ["./set-tree-modal.component.scss"],
})
export class SetTreeModalComponent implements OnInit, Modal {
	@Output() closeModal = new EventEmitter();
    @Output() set = new EventEmitter<Partial<Tree>>();

	@Input() tree?: Tree;

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {}

	close = (): void => this.closeModal.emit();

	create(form: NgForm): void {
		this.treeService
			.create({...form.value})
			.subscribe((tree: Partial<Tree>) => {
				this.set.emit(tree);
				this.close();
				this.treeService.treeSubject.next();
			});
	}

	update(form: NgForm): void {
		this.treeService
			.update(this.tree.id, {...form.value})
			.subscribe((tree: Partial<Tree>) => {
				this.set.emit(tree);
				this.close();
				Object.assign(this.tree, tree);
			});
	}
}
