import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.needToModify(request.url)
      //|| request.url.includes('i18n')
    ) {
      return next.handle(request);
    }

    const req = request.clone({
      url: this.getModifiedUrl(request.url),
    });

    return next.handle(req);
  }

  needToModify(url) {
    return !url.includes(environment.apiBase);
  }

  getModifiedUrl(requestUrl): string {
    return environment.apiBase + requestUrl;
  }
}
