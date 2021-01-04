import { EventEmitter } from "@angular/core";

export interface Modal {
    closeModal: EventEmitter<null>;
}