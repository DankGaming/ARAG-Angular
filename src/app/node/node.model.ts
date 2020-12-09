import { Tree } from "../tree/tree.model";

export enum ContentType {
	QUESTION = "QUESTION",
	ANSWER = "ANSWER",
	NOTIFICATION = "NOTIFICATION",
}

export class Node {
	id: number;
	content: string;
	type: ContentType;
}
