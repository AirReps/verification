import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import * as forge from 'node-forge';

@Component({
  selector: 'app-decode-cert',
  templateUrl: './decode-cert.component.html',
  styleUrls: ['./decode-cert.component.scss']
})
export class DecodeCertComponent implements OnInit, AfterViewChecked {

  @Input() certificate;

  constructor() { }

  ngOnInit(): void { }
  
  ngAfterViewChecked(): void {
    var cert = forge.pki.certificateFromPem(this.certificate.toString('binary'));
    
    // todo - extrapolate cert and create web template to view
    console.log(cert);
  }

}
