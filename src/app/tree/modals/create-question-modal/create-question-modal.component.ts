import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Tree } from "../../tree.model";
import { TreeService } from "../../tree.service";

@Component({
  selector: "app-create-question-modal",
  templateUrl: "./create-question-modal.component.html",
  styleUrls: ["./create-question-modal.component.scss"]
})
export class CreateQuestionModalComponent implements OnInit {
    @Output() closeModal = new EventEmitter<null>();
    @Output() question = new EventEmitter<Partial<Node>>();

    //constructor(private questionService: QuestionService) {}

    ngOnInit(): void {}

    close(): void {
        this.closeModal.emit();
    }

    createQuestion(form: NgForm): void {
        const values = form.value;
        // Link to service
    }
}
