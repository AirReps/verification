import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import * as forge from 'node-forge';
import { Observable } from 'rxjs';


export interface TableElement {
  key: string;
  value: string;
}

export interface ColourElement {
  status: boolean;
  colour: string;
}


@Component({
  selector: 'app-decode-cert',
  templateUrl: './decode-cert.component.html',
  styleUrls: ['./decode-cert.component.scss']
})
export class DecodeCertComponent implements OnInit, OnChanges {

  private static VERIFIED: string = 'VERIFIED SELLER';
  private static NOT_VERIFIED: string = 'UNVERIFIED SELLER';

  @Input() certificate;

  public SELLER_ELEMENT_DATA: TableElement[] = []
  public ISSUER_ELEMENT_DATA: TableElement[] = []

  public displayedColumns: string[] = ['Key', 'Value'];
  public sellerDataSource = new MatTableDataSource(this.SELLER_ELEMENT_DATA);
  public issuerDataSource = new MatTableDataSource(this.ISSUER_ELEMENT_DATA);

  private result: boolean;
  public verificationStatus: string = '';
  private statusColour: Array<ColourElement> = [
    {
      status: true,
      colour: '#56D364',
    },
    {
      status: false,
      colour: '#F85149',
    }
  ];

  constructor() { }
  
  decodeCert(cert: forge.pki.Certificate): void {
    this.verifyCert(cert);
    let seller = [];
    let issuer = [];
    cert.issuer.attributes.forEach((element) => {
      const key = this.breakCamelCase(element.name)
      issuer.push({key: key, value: element.value})
    })
    cert.subject.attributes.forEach((element) => {
      const key = this.breakCamelCase(element.name)
      seller.push({key: key, value: element.value})
    })
    this.sellerDataSource.data = seller;
    this.issuerDataSource.data = issuer;
  }

  verifyCert(cert: forge.pki.Certificate): void {
    const store = forge.pki.createCaStore([cert]);
    const verifiedResult: boolean = forge.pki.verifyCertificateChain(store, [cert]);
    this.setStatus(verifiedResult);
  }

  breakCamelCase(input: string) {
    const fixed = input;
    return input.slice(0,1).toUpperCase() + fixed.replace(/([A-Z])/g, " $1").slice(1);
  }

  setStatus(verifiedResult: boolean): void {
    if (verifiedResult) {
      this.verificationStatus = DecodeCertComponent.VERIFIED;
      this.result = true;
    } else {
      this.verificationStatus = DecodeCertComponent.NOT_VERIFIED;
      this.result = false;
    }
  }

  getHidden(opposite?: boolean) {
    if (opposite) {
      return this.certificate ? 'none' : '';  
    }
    return this.certificate ? '' : 'none';  
  }

  getColour() {
    return this.statusColour.filter(item => item.status == this.result)[0].colour;
  }

  ngOnInit(): void { 
    this.verificationStatus = DecodeCertComponent.NOT_VERIFIED;
    this.result = false;
  }

  ngOnChanges(changes): void {
    if(changes['certificate'] && this.certificate) {
      const cert = forge.pki.certificateFromPem(this.certificate);
      this.decodeCert(cert);
    }
  }

}
