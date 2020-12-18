import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	constructor(private http: HttpClient) {}

	findAll(treeID: number): Observable<Node[]> {
		const observable: Observable<Node[]> = this.http
			.get<HttpResult<Node[]>>(`/trees/${treeID}/notifications`)
			.pipe(map((response: HttpResult<Node[]>) => response.result));

		return observable;
	}
}
