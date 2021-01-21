import { CreateNodeDTO } from "src/app/node/dto/create-node.dto";
import { CreateFormInfoDTO } from "./create-form-info.dto";

export class CreateFromNodeDTO extends CreateNodeDTO {
	info: CreateFormInfoDTO;
}
