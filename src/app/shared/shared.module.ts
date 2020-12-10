import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ErrorBoxComponent } from "./error-box/error-box.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PublicNavigationComponent } from "./public-navigation/public-navigation.component";
import { RouterModule } from "@angular/router";
import { EmployeeNavigationComponent } from "./employee-navigation/employee-navigation.component";

@NgModule({
    declarations: [
        HeaderComponent,
        ErrorBoxComponent,
        PublicNavigationComponent,
        EmployeeNavigationComponent,
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule],
    exports: [
        HeaderComponent,
        ErrorBoxComponent,
        PublicNavigationComponent,
        EmployeeNavigationComponent,
    ],
})
export class SharedModule {}
