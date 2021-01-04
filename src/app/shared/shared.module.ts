import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ErrorBoxComponent } from "./error-box/error-box.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PublicNavigationComponent } from "./public-navigation/public-navigation.component";
import { RouterModule } from "@angular/router";
import { EmployeeNavigationComponent } from "./employee-navigation/employee-navigation.component";
import { ModalComponent } from "./modals/modal/modal.component";
import { ToggleComponent } from "./toggle/toggle.component";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { DropdownOptionDirective } from "./dropdown/dropdown-option.directive";
import { DropdownSelectedDirective } from "./dropdown/dropdown-selected.directive";
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
	declarations: [
		HeaderComponent,
		ErrorBoxComponent,
		PublicNavigationComponent,
		EmployeeNavigationComponent,
		ModalComponent,
		ToggleComponent,
		DropdownComponent,
		DropdownOptionDirective,
		DropdownSelectedDirective,
		PlaceholderDirective,
	],
	imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],
	exports: [
		HeaderComponent,
		ErrorBoxComponent,
		PublicNavigationComponent,
		EmployeeNavigationComponent,
		ModalComponent,
		ToggleComponent,
		DropdownComponent,
		DropdownOptionDirective,
		DropdownSelectedDirective,
		PlaceholderDirective
	],
})
export class SharedModule {}
