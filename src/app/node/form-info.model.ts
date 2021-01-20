import { Form } from "@angular/forms";

export interface FormInfo {
	id: number;
	form: Form;
	createdAt: Date;
	updatedAt: Date;
}
