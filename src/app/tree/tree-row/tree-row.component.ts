import { Component, Input, OnInit } from "@angular/core";
import { Tree } from "../tree.model";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-tree-row",
	templateUrl: "./tree-row.component.html",
	styleUrls: ["./tree-row.component.scss"],
})
export class TreeRowComponent implements OnInit {
	@Input() tree: Tree;

	icons = { faArrowRight };

	constructor() {}

	ngOnInit(): void {}
}
