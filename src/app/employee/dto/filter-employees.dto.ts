import { HttpFilter } from "src/app/shared/http-filter";

export class FilterEmployeesDTO extends HttpFilter {
	role?: boolean;
}
