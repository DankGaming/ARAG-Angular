export enum OrderDirection {
	ASC = "ASC",
	DESC = "DESC",
}

export class HttpFilter {
	skip?: number;
	take?: number;
	order?: string;
	orderDirection?: OrderDirection;
}
