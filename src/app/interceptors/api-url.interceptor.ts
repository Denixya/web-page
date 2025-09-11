import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function apiUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const mappings: Record<string, string> = {
    'http://localhost:3000/api/wow': '/api/wow',
    'http://localhost:3000/api/pokedex': '/api/pokedex',
  };

  let newUrl = req.url;
  for (const [local, prod] of Object.entries(mappings)) {
    if (newUrl.startsWith(local)) {
      newUrl = newUrl.replace(local, prod);
      break;
    }
  }

  const modifiedReq = req.clone({ url: newUrl });
  return next(modifiedReq);
}
