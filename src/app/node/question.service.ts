import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { CreateQuestionDTO } from "./dto/create-question.dto";
import { UpdateQuestionDTO } from "./dto/update-question.dto";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class QuestionService {
	constructor(private http: HttpClient) {}

	create(treeID: number, dto: CreateQuestionDTO): Observable<Partial<Node>> {
		const observer: Observable<Partial<Node>> = this.http
			.post<HttpResult<Partial<Node>>>(`/trees/${treeID}/questions`, {
				...dto,
			})
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);
		return observer;
	}

	update(
		treeID: number,
		questionID: number,
		dto: UpdateQuestionDTO
	): Observable<Partial<Node>> {
		const observer: Observable<Partial<Node>> = this.http
			.patch<HttpResult<Partial<Node>>>(
				`/trees/${treeID}/questions/${questionID}`,
				{
					...dto,
				}
			)
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);
		return observer;
	}
}
