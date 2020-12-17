import { QuestionInfo } from "../question-info.model";
import { CreateNodeDTO } from "./create-node.dto";

export class CreateQuestionDTO extends CreateNodeDTO {
	root?: boolean;
	info: QuestionInfo;
}
