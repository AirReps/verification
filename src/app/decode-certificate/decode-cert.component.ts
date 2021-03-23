import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-decode-cert',
  templateUrl: './decode-cert.component.html',
  styleUrls: ['./decode-cert.component.scss']
})
export class DecodeCertComponent implements OnInit {

  @Input() certificate: string;

  constructor() { }

  ngOnInit(): void {
  }

  // todo - decode cert and create web template to view

}
