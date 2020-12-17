import { QuestionInfo } from "../question-info.model";
import { CreateNodeDTO } from "./create-node.dto";

export class CreateQuestionDTO extends CreateNodeDTO {
	info: QuestionInfo;
}
