import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetFormModalComponent } from "./modals/set-form-modal/set-form-modal/set-form-modal.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { SetFieldModalComponent } from "./modals/set-field-modal/set-field-modal.component";




@NgModule({
  declarations: [SetFormModalComponent, SetFieldModalComponent],
  imports: [
    CommonModule, SharedModule, FormsModule
  ],
  exports: [SetFormModalComponent]
})
export class FormModule { }
