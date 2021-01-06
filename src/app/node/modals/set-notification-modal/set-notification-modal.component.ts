import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";
import { NotificationService } from "../../notification.service";
import { ContentType } from "../../content-type.model";
import { Node } from "../../node.model";
import { NodeService } from "../../node.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
	selector: "app-set-notification-modal",
	templateUrl: "./set-notification-modal.component.html",
	styleUrls: ["./set-notification-modal.component.scss"],
})


export class SetNotificationModalComponent implements OnInit, Modal {
	@Input() tree: Tree;
	@Input() notification?: Node;
	@Input() isRoot: boolean = false;
	@Output() closeModal = new EventEmitter();
	@Output() set = new EventEmitter<Partial<Node>>();

    editorConfig: AngularEditorConfig = {
        toolbarHiddenButtons: [
            [
                "subscript",
                "superscript",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "indent",
                "outdent",
                "insertUnorderedList",
                "insertOrderedList",
                "heading",
            ],
            [
                "backgroundColor",
                "customClasses",
                "link",
                "unlink",
                "insertImage",
                "insertVideo",
                "insertHorizontalRule",
                "removeFormat",
            ]
        ]
    };

	constructor(
		private notificationService: NotificationService,
		private nodeService: NodeService,
		private treeService: TreeService
	) {}

	ngOnInit(): void {}

	close(): void {
		this.closeModal.emit();
	}

	create(form: NgForm): void {
		const values = form.value;

		this.notificationService
			.create(this.tree.id, {
				content: values.content,
				type: ContentType.NOTIFICATION,
				root: values.treeRoot
			})
			.subscribe((node: Partial<Node>) => {
				this.set.emit(node);
				this.close();
			});
	}

	update(form: NgForm): void {
		const values = form.value;

		this.notificationService
			.update(this.tree.id, this.notification.id, {
				content: values.content,
				root: values.treeRoot
			})
			.subscribe((node: Partial<Node>) => {
				this.notification.content = node.content;
				if (values.treeRoot) this.tree.root = this.notification;
				this.close();
			});
	}


	remove(): void {
		this.nodeService.remove(this.tree.id, this.notification.id).subscribe();
		this.close();
		this.treeService.treeSubject.next();
	}
}
