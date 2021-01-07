import { QuestionInfo } from "../question-info.model";
import { UpdateNodeDTO } from "./update-node.dto";

export class UpdateQuestionDTO extends UpdateNodeDTO {
	root?: boolean;
	info?: QuestionInfo;
}
