export interface FormInput {
	id: number;
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
	type: {
		id: number;
		name: string;
	};
}
