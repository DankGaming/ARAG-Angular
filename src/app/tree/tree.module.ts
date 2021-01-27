import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreesComponent } from "./trees/trees.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { TreeRoutingModule } from "./trees-routing.module";
import { CustomerTreesOverviewComponent } from "./customer-trees-overview/customer-trees-overview.component";
import { TreeRowComponent } from "./tree-row/tree-row.component";
import { TreeRunComponent } from "./tree-run/tree-run.component";
import { TreeRunQuestionComponent } from "./tree-run/tree-run-question/tree-run-question.component";
import { TreeRunNotificationComponent } from "./tree-run/tree-run-notification/tree-run-notification.component";
import { TreeRunFormComponent } from "./tree-run/tree-run-form/tree-run-form.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EmployeeTreesOverviewComponent } from "./employee-trees-overview/employee-trees-overview.component";
import { FormsModule } from "@angular/forms";
import { EmployeeTreeOverviewComponent } from "./employee-tree-overview/employee-tree-overview.component";
import { NodeContainerComponent } from "./employee-tree-overview/node-wrapper/node-container/node-container.component";
import { NodeWrapperComponent } from "./employee-tree-overview/node-wrapper/node-wrapper.component";
import { SetTreeModalComponent } from "./modals/set-tree-modal/set-tree-modal.component";
import { SearchResultsComponent } from "./employee-tree-overview/search-results/search-results.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NodeModule } from "../node/node.module";
import { EmployeeSettingsComponent } from "../employee/employee-settings/employee-settings.component";

@NgModule({
	declarations: [
		TreesComponent,
		CustomerTreesOverviewComponent,
		TreeRowComponent,
		TreeRunComponent,
		TreeRunQuestionComponent,
		TreeRunNotificationComponent,
		TreeRunFormComponent,
		EmployeeTreesOverviewComponent,
		EmployeeTreeOverviewComponent,
		NodeContainerComponent,
		NodeWrapperComponent,
		SetTreeModalComponent,
		SearchResultsComponent,
		EmployeeSettingsComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		TreeRoutingModule,
		SharedModule,
		FontAwesomeModule,
		FormsModule,
		BrowserAnimationsModule,
		NodeModule,
	],
})
export class TreeModule {}
