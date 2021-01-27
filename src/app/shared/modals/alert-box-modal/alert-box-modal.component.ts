import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Modal } from "../modal.interface";

@Component({
  selector: "app-alert-box-modal",
  templateUrl: "./alert-box-modal.component.html",
  styleUrls: ["./alert-box-modal.component.scss"]
})

export class AlertBoxModalComponent implements OnInit, Modal {
    @Input() title: string = "Alert!";
    @Input() subtitle: string;
    @Input() body?: string;
    @Output() closeModal = new EventEmitter();
    @Output() confirmed = new EventEmitter();

    constructor() {}

    ngOnInit(): void { }

    close = (): void => this.closeModal.emit();

    confirm(): void {
        this.close();
        this.confirmed.emit();
    }
}
