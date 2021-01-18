import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeOverviewComponent } from "./employee-overview/employee-overview.component";
import { EmployeeRowComponent } from "./employee-row/employee-row.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { RouterModule } from "@angular/router";
import { SetEmployeeModalComponent } from "./set-employee-modal/set-employee-modal.component";
import { FormsModule } from "@angular/forms";



@NgModule({
    declarations: [EmployeeOverviewComponent, EmployeeRowComponent, SetEmployeeModalComponent],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule,
        FormsModule
    ]
})
export class EmployeeModule { }
