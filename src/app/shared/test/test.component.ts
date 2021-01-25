import { HttpClient } from "@angular/common/http";
import { Target } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormInput } from "../../form/input/form-input.model";

@Component({
	selector: "app-test",
	templateUrl: "./test.component.html",
	styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
	attachments: { [name: string]: File } = {};

	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	handleFileInput(target: any, input: any) {
		this.attachments[input.name] = target.files.item(0);
		console.log(this.attachments);
	}

	submit(form: NgForm): void {
		console.log(form);
		const formData = new FormData();
		for (const key of Object.keys(this.attachments)) {
			formData.append(
				key,
				this.attachments[key],
				this.attachments[key].name
			);
		}

		formData.append(
			"_form",
			new Blob([JSON.stringify(form.value)], {
				type: "application/json",
			})
		);

		formData.append(
			"_answers",
			new Blob([JSON.stringify({})], {
				type: "application/json",
			})
		);

		this.http.post(`/forms/1/submit`, formData).subscribe();
	}
}
