import { Employee } from "../employee/employee.model";

export interface DecodedJWT {
	iat: number;
	exp: number;
	user: Employee;
}
