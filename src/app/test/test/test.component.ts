import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-test",
	templateUrl: "./test.component.html",
	styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
	constructor(private http: HttpClient) {}
	files: FileList;

	ngOnInit(): void {}

	handleFileInput(files: FileList): void {
		this.files = files;
	}

	submit(form: NgForm): void {
		console.log(form.value);
		const formData = new FormData();
		formData.append("file", this.files.item(0), "file");
		this.http
			.post(`/forms/1/submit`, {
				answers: { "107": 108 },
				form: {
					Voornaam: "Jan",
				},
				...formData,
			})
			.subscribe((res) => {
				console.log(res);
			});
	}
}
