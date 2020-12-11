import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentType } from "src/app/node/content-type.model";
import { Node } from "src/app/node/node.model";
import { Tree } from "src/app/tree/tree.model";

@Component({
	selector: "app-node-container",
	templateUrl: "./node-container.component.html",
	styleUrls: ["./node-container.component.scss"],
})
export class NodeContainerComponent implements OnInit {
	@Input() node: Node;
	@Input() tree: Tree;
	@Input() isCurrentTop: boolean = false;

	@Output() expand = new EventEmitter();

	type: string;

	constructor() {}

	ngOnInit(): void {
		this.type = this.isQuestion()
			? "Vraag"
			: this.isAnswer
			? "Antwoord"
			: "Notificatie";
	}

	isRoot = (): boolean => this.node.id === this.tree.root.id;

	isQuestion = (): boolean => this.node.type === ContentType.QUESTION;
	isNotification = (): boolean => this.node.type === ContentType.NOTIFICATION;
	isAnswer = (): boolean => this.node.type === ContentType.ANSWER;

	expandQuestion(): void {
		this.expand.emit();
	}
}
