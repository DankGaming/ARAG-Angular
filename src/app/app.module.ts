import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { TreeModule } from "./tree/tree.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APIInterceptor } from "./shared/api.interceptor";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		AuthModule,
		SharedModule,
		TreeModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
