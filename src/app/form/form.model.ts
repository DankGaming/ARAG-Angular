import { FormInput } from "./input/form-input.model";

export interface Form {
    id: number;
    name: string;
    description?: string;
    inputs: FormInput[];
    createdAt: Date;
    updatedAt: Date;
}
