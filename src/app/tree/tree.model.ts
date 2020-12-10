import { Employee } from "../employee/employee.model";
import { Node } from "../node/node.model";

export class Tree {
    id: number;
    name: string;
    description?: string;
    root: Node;
    creator: Employee;
    createdAt: Date;
    updatedAt: Date;
}
