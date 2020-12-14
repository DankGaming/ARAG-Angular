import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { DirectedAcyclicGraph } from "./directed-acyclic-graph.model";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class NodeService {
	constructor(private http: HttpClient) {}

	findDirectedAcyclicGraph(treeID: number): Observable<DirectedAcyclicGraph> {
		const observer: Observable<DirectedAcyclicGraph> = this.http
			.get<HttpResult<DirectedAcyclicGraph>>(`/trees/${treeID}/nodes`)
			.pipe(
				map(
					(response: HttpResult<DirectedAcyclicGraph>) =>
						response.result
				)
			);

		return observer;
	}

	findByID(treeID: number, nodeID: number): Observable<Node> {
		const observer: Observable<Node> = this.http
			.get<HttpResult<Node>>(`/trees/${treeID}/nodes/${nodeID}`)
			.pipe(map((response: HttpResult<Node>) => response.result));
		return observer;
	}
}
