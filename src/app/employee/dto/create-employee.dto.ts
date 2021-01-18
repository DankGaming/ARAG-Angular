import { Role } from "../employee.model";

export interface CreateEmployeeDTO {
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
