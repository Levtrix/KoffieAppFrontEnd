import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoundcomponent',
  templateUrl: './notfoundcomponent.component.html',
  styleUrls: ['./notfoundcomponent.component.css']
})
export class NotfoundcomponentComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
