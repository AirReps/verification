import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'Accept': 'text/html, application/xhtml+xml, */*',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  
  private rType = 'text';

  private api: string = environment.apiSlug + environment.endpoint;
  private static SELLER: string = 'seller';
  private static PRODUCT: string = 'product';

  constructor(
    private http: HttpClient) { }

  /**
   * Calls AirReps' API
   * 
   * @param params - Object - query parametes
   * @returns api result
   */
  getCertificate(params: Object): Observable<any> {
    let queryParameters: HttpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      queryParameters = queryParameters.set(key.toString(), value.toString());
    }

    return this.http.get<any>(this.api, { headers: this.headers, responseType: this.rType as any, params: queryParameters,} )
      .pipe(
        catchError(this.handleError<any>('getCertificate', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
