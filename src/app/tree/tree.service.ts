import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { FilterTreesDTO } from "./dto/filter-trees.dto";
import { Tree } from "./tree.model";

@Injectable({
    providedIn: "root",
})
export class TreeService {
    constructor(private http: HttpClient) {}

    findAll(filter?: FilterTreesDTO): Observable<Tree[]> {
        const observer: Observable<Tree[]> = this.http
            .get<HttpResult<Tree[]>>("/trees", {
            params: filter as HttpParams,
        })
            .pipe(map((response: HttpResult<Tree[]>) => response.result));

        return observer;
    }
}
