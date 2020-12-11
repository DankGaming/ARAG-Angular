import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { CreateTreeDTO } from "./dto/create-tree.dto";
import { FilterTreesDTO } from "./dto/filter-trees.dto";
import { Tree } from "./tree.model";

@Injectable({
	providedIn: "root",
})
export class TreeService {
	treeSubject = new Subject<null>();

	constructor(private http: HttpClient) {}

	findAll(filter?: FilterTreesDTO): Observable<Tree[]> {
		const observer: Observable<Tree[]> = this.http
			.get<HttpResult<Tree[]>>("/trees", {
				params: filter as HttpParams,
			})
			.pipe(map((response: HttpResult<Tree[]>) => response.result));

		return observer;
	}

	create(dto: CreateTreeDTO): Observable<Partial<Tree>> {
		const observer: Observable<Partial<Tree>> = this.http
			.post<HttpResult<Partial<Tree>>>("/trees", {
				...dto,
			})
			.pipe(
				map((response: HttpResult<Partial<Tree>>) => response.result)
			);

		return observer;
	}
}
