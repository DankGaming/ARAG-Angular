export interface FormInput {
    id: number;
    name: string;
    description: string;
    type: FormInputType;
    createdAt: Date;
    updatedAt: Date;
}

export interface FormInputType{
    id: number;
    name: string;
}
