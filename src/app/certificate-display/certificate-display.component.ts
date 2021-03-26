import { Component, OnInit } from '@angular/core';
import { version } from '../../../package.json';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-certificate-display',
  templateUrl: './certificate-display.component.html',
  styleUrls: ['./certificate-display.component.scss']
})
export class CertificateDisplayComponent implements OnInit {

  private BUILD: string = 'Version ';
  public buildNumber: string = '';
  public apiResponse: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildVersion();
    this.route.queryParams.subscribe((params) => {
      this.queryApi(params);
    })
  }

  buildVersion() {
    return this.buildNumber = this.BUILD + version
  }

  queryApi(queryParameters: Object) {
    const ifKeys = Object.keys(queryParameters)
    if (ifKeys.length !== 0) {
      this.apiService.getCertificate(queryParameters).subscribe((result) => {
        this.apiResponse = result;
      });
    }
  }

}
