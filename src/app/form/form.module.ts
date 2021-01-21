import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetFormModalComponent } from "./modals/set-form-modal/set-form-modal.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { SetFieldModalComponent } from "./modals/set-field-modal/set-field-modal.component";
import { FormOverviewComponent } from "./form-overview/form-overview.component";
import { FormRowComponent } from "./form-row/form-row.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsRoutingModule } from "./forms-routing.module";
import { RouterModule } from "@angular/router";
import { CustomerFormViewComponent } from "./customer-form-view/customer-form-view.component";




@NgModule({
  declarations: [SetFormModalComponent, SetFieldModalComponent, FormOverviewComponent, FormRowComponent, CustomerFormViewComponent],
    imports: [
        CommonModule, SharedModule, FormsModule, FontAwesomeModule, FormsRoutingModule, RouterModule
    ],
  exports: [SetFormModalComponent]
})
export class FormModule { }
