import { ContentType } from "./content-type.model";
export class Node {
	id: number;
	content: string;
	type: ContentType;
	children?: Node[];
}
