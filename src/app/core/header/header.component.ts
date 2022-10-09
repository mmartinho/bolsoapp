import { Component, OnInit } from '@angular/core';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** Fonte Aweson */
  faUser = faUser ;
  faBars = faBars;

  constructor() { }

  ngOnInit(): void {

  }
}
