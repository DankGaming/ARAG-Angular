import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderComponent } from "./shared/ui/header/header.component";
import { LoginComponent } from "./auth/login/login.component";
import { TreesComponent } from "./employee/trees/trees.component";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		TreesComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
