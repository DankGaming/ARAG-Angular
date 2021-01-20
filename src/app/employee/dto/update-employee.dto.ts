import { Role } from "../employee.model";

export interface UpdateEmployeeDTO {
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
