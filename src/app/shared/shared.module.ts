import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ErrorBoxComponent } from './error-box/error-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [HeaderComponent, ErrorBoxComponent],
	imports: [CommonModule, FontAwesomeModule],
	exports: [HeaderComponent, ErrorBoxComponent],
})
export class SharedModule {}
