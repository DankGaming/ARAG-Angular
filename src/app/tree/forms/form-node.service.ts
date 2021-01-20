import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { CreateFromNodeDTO } from "./dto/create-form-node.dto";
import { Node } from "src/app/node/node.model";
import { HttpResult } from "src/app/shared/http-result";

@Injectable({
	providedIn: "root",
})
export class FormNodeService {
	treeSubject = new Subject<null>();

	constructor(private http: HttpClient) {}

	create(treeID: number, dto: CreateFromNodeDTO): Observable<Partial<Node>> {
		const observer: Observable<Partial<Node>> = this.http
			.post<HttpResult<Partial<Node>>>(`/trees/${treeID}/forms`, {
				...dto,
			})
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);

		return observer;
	}
}
