import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import * as forge from 'node-forge';

export interface TableElement {
  key: string;
  value: string;
}

let SELLER_ELEMENT_DATA: TableElement[] = []
let ISSUER_ELEMENT_DATA: TableElement[] = []

@Component({
  selector: 'app-decode-cert',
  templateUrl: './decode-cert.component.html',
  styleUrls: ['./decode-cert.component.scss']
})
export class DecodeCertComponent implements OnInit {

  @Input() certificate;

  displayedColumns: string[] = ['Key', 'Value'];
  sellerDataSource = new MatTableDataSource(SELLER_ELEMENT_DATA);
  issuerDataSource = new MatTableDataSource(ISSUER_ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void { 
    const cert = forge.pki.certificateFromPem(this.certificate);    
    this.decodeCert(cert)
  }
  
  decodeCert(cert: forge.pki.Certificate) {
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
    this.issuerDataSource.data = issuer
  }

  breakCamelCase(input: String) {
    let fixed = input;
    return input.slice(0,1).toUpperCase() + fixed.replace(/([A-Z])/g, " $1").slice(1);
  }

}
