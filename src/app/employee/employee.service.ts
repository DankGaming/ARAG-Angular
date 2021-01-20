import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { CreateEmployeeDTO } from "./dto/create-employee.dto";
import { FilterEmployeesDTO } from "./dto/filter-employees.dto";
import { Employee } from "./employee.model";
import { UpdateEmployeeDTO } from "./dto/update-employee.dto";

@Injectable({
    providedIn: "root",
})
export class EmployeeService {
    employeeSubject = new Subject<null>();

    constructor(private http: HttpClient) {}

    findAll(filter?: FilterEmployeesDTO): Observable<Employee[]> {
        const observer: Observable<Employee[]> = this.http
            .get<HttpResult<Employee[]>>("/employees", {
                params: filter as HttpParams,
            })
            .pipe(map((response: HttpResult<Employee[]>) => response.result));

        return observer;
    }

    findByID(id: number): Observable<Employee> {
        const observer: Observable<Employee> = this.http
            .get<HttpResult<Employee>>(`/employee/${id}`)
            .pipe(map((response: HttpResult<Employee>) => response.result));
        return observer;
    }

    create(dto: CreateEmployeeDTO): Observable<Partial<Employee>> {
        const observer: Observable<Partial<Employee>> = this.http
            .post<HttpResult<Partial<Employee>>>("/employees", {
                ...dto,
            })
            .pipe(
                map((response: HttpResult<Partial<Employee>>) => response.result)
            );

        return observer;
    }

    update(id: number, dto: UpdateEmployeeDTO): Observable<Partial<Employee>> {
        const observer: Observable<Partial<Employee>> = this.http
            .patch<HttpResult<Partial<Employee>>>(`/employees/${id}`, {
                ...dto,
            })
            .pipe(
                map((response: HttpResult<Partial<Employee>>) => response.result)
            );
        return observer;
    }

    remove(id: number): Observable<HttpResult<null>> {
        return this.http.delete<HttpResult<null>>(`/employees/${id}`);
    }
}
