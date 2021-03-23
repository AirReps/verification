import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
// import * as filter from 'rxjs/operators/filter';

@Component({
  selector: 'app-certificate-display',
  templateUrl: './certificate-display.component.html',
  styleUrls: ['./certificate-display.component.scss']
})
export class CertificateDisplayComponent implements OnInit {

  private static VERIFIED: string = 'SELLER VERIFIED: ';
  private static NOT_VERIFIED: string = 'SELLER NOT VERIFIED: ';
  private result: boolean = true;
  public verificationStatus: string = '';

  public apiResponse: string = '';

  private statusColour = [
    {
      'status': true,
      'colour': '#56D364',
    },
    {
      'status': false,
      'colour': '#F85149',
    }
  ];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryApi(params);
    })
  }

  setStatus(result: boolean, seller: string): void {
    if (result) {
      this.verificationStatus = CertificateDisplayComponent.VERIFIED + seller;
    } else {
      this.verificationStatus = CertificateDisplayComponent.NOT_VERIFIED + seller;
    }
  }

  getColour(element?: string) {
    return this.statusColour.filter(item => item.status == this.result)[0].colour;
  }

  queryApi(queryParameters: Object) {
    // this.apiService.getCertificate(queryParameters).subscribe((result) => {
    //   this.apiResponse = result;
      this.setStatus(this.result, Object.values(queryParameters)[0].toUpperCase());
    // });
    
    // @todo - remove this assignment - only used for dev until API exists
    this.apiResponse = this.apiService.certificate;
  }

  returnToReferrer() {
    window.location.replace(document.referrer);
  }

}
