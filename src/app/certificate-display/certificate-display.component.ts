import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-certificate-display',
  templateUrl: './certificate-display.component.html',
  styleUrls: ['./certificate-display.component.scss']
})
export class CertificateDisplayComponent implements OnInit {

  public apiResponse: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryApi(params);
    })
  }

  queryApi(queryParameters: Object) {
    // this.apiService.getCertificate(queryParameters).subscribe((result) => {
    //   this.apiResponse = result;
    // });
    
    // @todo - remove this assignment - only used for dev until API exists
    this.apiResponse = this.apiService.certificate;
  }

  returnToReferrer() {
    window.location.replace(document.referrer);
  }

}
