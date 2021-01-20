
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpFilter } from "../../shared/http-filter";
import { HttpResult } from "../../shared/http-result";
import { FormInput } from "./form-input.model";
import { UpdateFormInputDTO } from "./dto/update-form-input.dto";
import { CreateFormInputDTO } from "./dto/create-form-input.dto";

@Injectable({
    providedIn: "root"
})
export class FormService {
    formSubject = new Subject<null>();

    constructor(private http: HttpClient) {}

    findAll(formID: number, filter?: HttpFilter): Observable<FormInput[]> {
        const observer: Observable<FormInput[]> = this.http
            .get<HttpResult<FormInput[]>>(`/forms/${formID}/inputs`, {
                params: filter as HttpParams,
            })
            .pipe(map((response: HttpResult<FormInput[]>) => response.result));

        return observer;
    }

    findByID(formID: number, id: number): Observable<FormInput> {
        const observer: Observable<FormInput> = this.http
            .get<HttpResult<FormInput>>(`/forms/${formID}/inputs/${id}`)
            .pipe(map((response: HttpResult<FormInput>) => response.result));
        return observer;
    }

    create(formID: number, dto: CreateFormInputDTO): Observable<Partial<FormInput>> {
        const observer: Observable<Partial<FormInput>> = this.http
            .post<HttpResult<Partial<FormInput>>>(`/forms/${formID}/inputs`, {
                ...dto,
            })
            .pipe(
                map((response: HttpResult<Partial<FormInput>>) => response.result)
            );

        return observer;
    }

    update(formID: number, id: number, dto: UpdateFormInputDTO): Observable<Partial<FormInput>> {
        const observer: Observable<Partial<FormInput>> = this.http
            .patch<HttpResult<Partial<FormInput>>>(`/forms/${formID}/inputs/${id}`, {
                ...dto,
            })
            .pipe(
                map((response: HttpResult<Partial<FormInput>>) => response.result)
            );
        return observer;
    }

    remove(formID: number, id: number): Observable<HttpResult<null>> {
        return this.http.delete<HttpResult<null>>(`/forms/${formID}/inputs/${id}`);
    }
}
