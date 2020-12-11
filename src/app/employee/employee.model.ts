export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export enum Role {
    ADMIN = "ADMIN",
    STANDARD = "STANDARD",
}
