import { FormInfo } from "../form/form-info.model";
import { ContentType } from "./content-type.model";
import { QuestionInfo } from "./question-info.model";
export class Node {
	id: number;
	content: string;
	type: ContentType;
	children?: Node[];
	questionInfo?: QuestionInfo;
	formInfo?: FormInfo;
}
