import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Modal } from "src/app/shared/modals/modal.interface";
import { Tree } from "src/app/tree/tree.model";
import { TreeService } from "src/app/tree/tree.service";

@Component({
  selector: "app-set-form-modal",
  templateUrl: "./set-form-modal.component.html",
  styleUrls: ["./set-form-modal.component.scss"]
})
export class SetFormModalComponent implements OnInit, Modal {
  @Input() tree: Tree;
  @Output() closeModal = new EventEmitter();


  // TODO make hier een input van
  form = true;

  constructor(private treeService: TreeService,
    )  { }


  ngOnInit(): void {
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
    this.close();
  }

  remove(): void {
    console.log("Deze knop heeft het verwijderd");
    this.close();
  }
}
