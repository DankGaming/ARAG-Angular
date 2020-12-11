import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class NodeService {
	constructor(private http: HttpClient) {}

	findByID(treeID: number, nodeID: number): Observable<Node> {
		const observer: Observable<Node> = this.http
			.get<HttpResult<Node>>("/trees/" + treeID + "/nodes/" + nodeID)
			.pipe(map((response: HttpResult<Node>) => response.result));
		return observer;
	}
}
