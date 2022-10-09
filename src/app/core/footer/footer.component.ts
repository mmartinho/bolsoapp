import { Component, OnInit } from '@angular/core';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /** Fonts Awesome */
  faHome = faHome;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit(): void {
    
  }

}
