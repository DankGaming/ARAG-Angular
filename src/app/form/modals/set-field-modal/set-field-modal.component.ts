import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Tree } from "src/app/tree/tree.model";

@Component({
  selector: "app-set-field-modal",
  templateUrl: "./set-field-modal.component.html",
  styleUrls: ["./set-field-modal.component.scss"]
})
export class SetFieldModalComponent implements OnInit, Modal {
  @Input() tree: Tree;
  @Output() closeModal = new EventEmitter();

  field = true;

  types = [
    { name: "Geen", value: 0 },
		{ name: "Tekstveld", value: 1 },
		{ name: "Bestand", value: 2 },
  ];

  type: {name: string; value: number};

  constructor() { }

  ngOnInit(): void {
    this.type = this.types[0];
  }

  close(): void {
    this.closeModal.emit();
  }

  // TODO hier moet een request komen
  create(form: NgForm): void {
    const values = form.value;

    console.log(values.content);
    console.log(values.description);
    this.close();
  }

  // TODO hier moet een request komen
  update(form: NgForm): void {
    const values = form.value;

    console.log(values.content);
    console.log(values.description);
    console.log(values.type.value);
    this.close();
  }

  remove(): void {
    console.log("Deze knop heeft het verwijderd");
    this.close();
  }
}
