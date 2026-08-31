import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { isNotEmpty } from '../../shared/empty.util';

@Injectable({providedIn: 'root'})
/**
 * Http Interceptor that forwards the visitor's identity to the REST API, so that the requests this
 * server makes while rendering a page are attributed to the visitor it renders for, and not to the
 * server itself.
 */
export class ForwardClientIpInterceptor implements HttpInterceptor {
  constructor(@Inject(REQUEST) protected req: any) {
  }

  /**
   * Intercept http requests and add the client's IP and user agent to them
   * @param httpRequest
   * @param next
   */
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clientIp = this.req.get('x-forwarded-for') || this.req.connection.remoteAddress;
    const headers: { [name: string]: string } = { 'X-Forwarded-For': clientIp };

    // The REST API logs a usage event for the requests it serves and lets SpiderDetector decide,
    // from the User-Agent, whether that event came from a bot. Without forwarding the header, every
    // page rendered on the server reaches the API carrying this server's own agent: no crawler is
    // ever recognised, and the usage statistics count bot traffic as real visits.
    const userAgent = this.req.get('user-agent');
    if (isNotEmpty(userAgent)) {
      headers['User-Agent'] = userAgent;
    }

    return next.handle(httpRequest.clone({ setHeaders: headers }));
  }
}
