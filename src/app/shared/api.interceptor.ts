import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const apiReq = req.clone({
            // url: `http://134.122.55.77:5000${req.url}`,
            url: `http://localhost:3000${req.url}`
        });

        return next.handle(apiReq);
    }
}
