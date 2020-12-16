import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
	selector: "app-edit-tree-modal",
	templateUrl: "./set-tree-modal.component.html",
	styleUrls: ["./set-tree-modal.component.scss"],
})
export class EditTreeModalComponent implements OnInit {
	@Output() closeModal = new EventEmitter<null>();
    @Output() tree = new EventEmitter<Partial<Tree>>();
    
    @Input() model: Tree;

	constructor(private treeService: TreeService) {
        
    }

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
    }

	submit(form: NgForm): void {
		const values = form.value;

		this.treeService
			.update({
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
