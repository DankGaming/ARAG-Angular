import { CreateNodeDTO } from "./create-node.dto";

export class CreateNotificationDTO extends CreateNodeDTO {
	root?: boolean;
	next?: number;
}
