import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { CreateAnswerDTO } from "./dto/create-answer.dto";
import { UpdateAnswerDTO } from "./dto/update-answer.dto";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class AnswerService {
	constructor(private http: HttpClient) {}

	create(
		treeID: number,
		questionID: number,
		dto: CreateAnswerDTO
	): Observable<Partial<Node>> {
		const observable: Observable<Partial<Node>> = this.http
			.post<HttpResult<Partial<Node>>>(
				`/trees/${treeID}/questions/${questionID}/answers`,
				{
					...dto,
				}
			)
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);

		return observable;
	}

	update(
		treeID: number,
		questionID: number,
		answerID: number,
		dto: UpdateAnswerDTO
	): Observable<Partial<Node>> {
		const observable: Observable<Partial<Node>> = this.http
			.patch<HttpResult<Partial<Node>>>(
				`/trees/${treeID}/questions/${questionID}/answers/${answerID}`,
				{
					...dto,
				}
			)
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);

		return observable;
	}
}
