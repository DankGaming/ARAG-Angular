import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import {UpdateEmployeeDto} from "./dto/update.employee.dto";
import {Employee} from "./employee.model";

@Injectable({
    providedIn: "root",
})

export class EmployeeService {
    constructor(private http: HttpClient) {}

    update(id: number, dto: UpdateEmployeeDto): Observable<Partial<Employee>> {
        const observer: Observable<Partial<Employee>> = this.http
            .patch<HttpResult<Partial<Employee>>>(`/employees/${id}`, {
                ...dto,
            })
            .pipe(
                map((response: HttpResult<Partial<Employee>>) => response.result)
            );
        return observer;
    }
}
