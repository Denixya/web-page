import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function apiUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const newUrl = req.url.replace('http://localhost:3000/api/wow', '/api/wow');
  const modifiedReq = req.clone({ url: newUrl });
  return next(modifiedReq);
}
