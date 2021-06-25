import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtService } from '../../auth/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.needToModify(request.url)
      //|| request.url.includes('i18n')
    ) {
      return next.handle(request);
    }

    const setHeaders = {};
    if (this.jwtService.isLoggedIn()) {
      setHeaders['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }

    const req = request.clone({
      url: this.getModifiedUrl(request.url),
      setHeaders
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
