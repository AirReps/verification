import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public certificate: string = '-----BEGIN CERTIFICATE-----MIIDczCCAlsCCQD3g74MgOjieDANBgkqhkiG9w0BAQsFADBcMSQwIgYDVQQKDBtBaXJSZXBzIFNlbGxlciBWZXJpZmljYXRpb24xEDAOBgNVBAsMB0FpclJlcHMxIjAgBgNVBAMMGXZlcmlmaWNhdGlvbi5haXJyZXBzLmluZm8wHhcNMjEwMzIzMTQ0OTMxWhcNMjIwMzIzMTQ0OTMxWjCBmjELMAkGA1UEBhMCQ04xHjAcBgNVBAMMFWNubnR4ai5lbi5hbGliYWJhLmNvbTEVMBMGA1UEBwwMRG9uZ2d1YW5nc2hpMRMwEQYDVQQKDApKZW5ueSBDaGVuMRIwEAYDVQQIDAlHdWFuZ2RvbmcxKzApBgNVBAsMIkRvbmdndWFuIE5hbnRvbmcgWGluZ2ppIFRlY2hub2xvZ3kwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDBAgDIg2Qo1s3cOlfC/Ngn2RXl2n/4ID6xW5QrBRh/qa03nPMQ1/7AWY5qmmcOMf7OZNf/MrMWYTOyuj/O3JwUZoIBXUafFwcJPuyzAAtLrrjZp/gGNsoJjOy8cGCLuTM20LBn1m3FGs76VDeFhW7UozJfh9KgDsb8HKMaWl6qunpkgkCnnfYv7VDqgmftqt7LxAwEA0YlaaUceNbBcuS4Fgfc8tLbBrwVO4ZhEARno3bSfvS3lzY0acD7V2fxDnIA+/zQBvb/yNaM447fHcQ54k4ZXdCgpi+mHhqOduRaNgIgQ+WdpzC8B8V3lwd5I38Ft3O5ZZAUdncvP3hL/kmZAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAHVJv/7/RGmllkrCJOqXIOgRIRUn1av0HYQI8LOQK2f/En/EIIS9wwxZUaHEdcmHpz2JfFxSXrJMzWiecc3SHz474bJlGFTciZdd1aZ2sGQN0m+DkNkmInbH7gykHeeTY0V0eTJlffB+maBX57IkfpWR7naWRuNLCOF878n1bPfbD7aT++R9G0iIU3VdKyRw3uN9uVCqJTsELKCmvYW8f9UxcnpsKMW2rfdevwiYZuQJNpMJCAF6F+z6HKBJd0dOWeGNW3DwUelACF/N69g0pAXjOxNI4kfefei/wdAoB0H8irE14jDuwoCCNq+vRUuaz1AsFxRYkccqgs/vCPvKMjA=-----END CERTIFICATE-----'

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

    return this.http.get<any>(this.api, {params: queryParameters} )
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
