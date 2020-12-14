import { ContentType } from "src/app/node/content-type.model";
import { HttpFilter } from "src/app/shared/http-filter";

export class FilterDirectedAcyclicGraphDTO extends HttpFilter {
	start?: number;
	end?: ContentType;
}
