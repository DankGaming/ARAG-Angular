import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpResult } from "../shared/http-result";
import { UpdateNotificationDTO } from "./dto/update-notification.dto";
import { Node } from "./node.model";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	constructor(private http: HttpClient) {}

	findAll(treeID: number): Observable<Node[]> {
		const observable: Observable<Node[]> = this.http
			.get<HttpResult<Node[]>>(`/trees/${treeID}/notifications`)
			.pipe(map((response: HttpResult<Node[]>) => response.result));

		return observable;
	}

	update(
		treeID: number,
		notificationID: number,
		dto: UpdateNotificationDTO
	): Observable<Partial<Node>> {
		const observable: Observable<Partial<Node>> = this.http
			.patch<HttpResult<Partial<Node>>>(
				`/trees/${treeID}/notifications/${notificationID}`,
				{
					...dto,
				}
			)
			.pipe(
				map((response: HttpResult<Partial<Node>>) => response.result)
			);

		return observable;
	}

	unlink(treeID: number, notificationID: number): Observable<null> {
		const observable: Observable<null> = this.http.patch<null>(`/trees/${treeID}/notifications/${notificationID}/unlink`, {});
		return observable;
	}
}
