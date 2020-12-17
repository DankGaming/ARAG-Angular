import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { SetQuestionModalComponent } from "./modals/set-question-modal.ts/set-question-modal.component";

@NgModule({
	declarations: [SetQuestionModalComponent],
	imports: [CommonModule, SharedModule, FormsModule],
	exports: [SetQuestionModalComponent],
})
export class NodeModule {}
