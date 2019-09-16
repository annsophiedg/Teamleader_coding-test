import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-success-window',
  templateUrl: './success-window.component.html',
  styleUrls: ['./success-window.component.css']
})
export class SuccessWindowComponent implements OnInit {

  @Input() message;

  constructor() { }

  ngOnInit() {
  }

}
