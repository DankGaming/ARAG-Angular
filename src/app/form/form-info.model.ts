import { Form } from "./form.model";

export interface FormInfo {
	id: number;
	form: Form;
	createdAt: Date;
	updatedAt: Date;
}
