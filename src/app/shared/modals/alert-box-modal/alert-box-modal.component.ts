import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "app-alert-box-modal",
  templateUrl: "./alert-box-modal.component.html",
  styleUrls: ["./alert-box-modal.component.scss"]
})
export class AlertBoxModalComponent implements OnInit {
    @Input() title: string = "Alert!";
    @Input() subtitle: string = "Het kan zijn dat uw gegevens verloren gaan -_-";
    @Output() closeModal = new EventEmitter();
    @Output() confirmed = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}

    close = (): void => this.closeModal.emit();

    confirm(): void {
        this.close();
        this.confirmed.emit();
    }
}
