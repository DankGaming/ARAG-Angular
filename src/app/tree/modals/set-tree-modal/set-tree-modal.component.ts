import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
	selector: "app-set-tree-modal",
	templateUrl: "./set-tree-modal.component.html",
	styleUrls: ["./set-tree-modal.component.scss"],
})
export class SetTreeModalComponent implements OnInit {
	@Output() closeModal = new EventEmitter<null>();
    @Output() set = new EventEmitter<Partial<Tree>>();

	@Input() tree?: Tree;

	constructor(private treeService: TreeService) {}

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
    }

	create(form: NgForm): void {
		this.treeService
			.create({...form.value})
			.subscribe((tree: Partial<Tree>) => {
				this.set.emit(tree);
				this.closeModal.emit();
				this.treeService.treeSubject.next();
			});
	}

	update(form: NgForm): void {
		this.treeService
			.update(this.tree.id, {...form.value})
			.subscribe((tree: Partial<Tree>) => {
				this.set.emit(tree);
				this.closeModal.emit();
				Object.assign(this.tree, tree);
			});
	}
}
