import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpResult } from "../shared/http-result";
import { map } from "rxjs/operators";
import { Form } from "./form.model";
import { HttpFilter } from "../shared/http-filter";
import { CreateFormDTO } from "./dto/create-form.dto";
import { UpdateFormDTO } from "./dto/update-form.dto";

@Injectable({
	providedIn: "root",
})
export class FormService {
	formSubject = new Subject<null>();

	constructor(private http: HttpClient) {}

	findAll(filter?: HttpFilter): Observable<Form[]> {
		const observer: Observable<Form[]> = this.http
			.get<HttpResult<Form[]>>("/forms", {
				params: filter as HttpParams,
			})
			.pipe(map((response: HttpResult<Form[]>) => response.result));

		return observer;
	}

	findByID(id: number): Observable<Form> {
		const observer: Observable<Form> = this.http
			.get<HttpResult<Form>>(`/forms/${id}`)
			.pipe(map((response: HttpResult<Form>) => response.result));
		return observer;
	}

	create(dto: CreateFormDTO): Observable<Partial<Form>> {
		const observer: Observable<Partial<Form>> = this.http
			.post<HttpResult<Partial<Form>>>("/forms", {
				...dto,
			})
			.pipe(
				map((response: HttpResult<Partial<Form>>) => response.result)
			);

		return observer;
	}

	update(id: number, dto: UpdateFormDTO): Observable<Partial<Form>> {
		const observer: Observable<Partial<Form>> = this.http
			.patch<HttpResult<Partial<Form>>>(`/forms/${id}`, {
				...dto,
			})
			.pipe(
				map((response: HttpResult<Partial<Form>>) => response.result)
			);
		return observer;
	}

	remove(id: number): Observable<HttpResult<null>> {
		return this.http.delete<HttpResult<null>>(`/forms/${id}`);
	}
}
