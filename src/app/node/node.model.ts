import { ContentType } from "./content-type.model";
import { FormInfo } from "./form-info.model";
import { QuestionInfo } from "./question-info.model";
export class Node {
	id: number;
	content: string;
	type: ContentType;
	children?: Node[];
	questionInfo?: QuestionInfo;
	formInfo?: FormInfo;
}
