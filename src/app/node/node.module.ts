import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { SetQuestionModalComponent } from "./modals/set-question-modal.ts/set-question-modal.component";
import { SetAnswerModalComponent } from "./modals/set-answer-modal/set-answer-modal.component";
import { SetNotificationModalComponent } from "./modals/set-notification-modal/set-notification-modal.component";
import { LinkModalComponent } from "./modals/link-modal/link-modal.component";

@NgModule({
	declarations: [
		SetQuestionModalComponent,
		SetAnswerModalComponent,
		LinkModalComponent,
		SetNotificationModalComponent
	],
	imports: [CommonModule, SharedModule, FormsModule],
	exports: [
		SetQuestionModalComponent,
		SetAnswerModalComponent,
		LinkModalComponent,
		SetNotificationModalComponent
	],
})
export class NodeModule {}
