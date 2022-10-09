import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewChecked {

  /** Fonts Awesome */
  faHome = faHome;
  faPlusCircle = faPlusCircle;

  user : User = { id: 0, name: '', email: ''};

  constructor(private userService: UserService) { }

  private updateUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;  
    });     
  }

  ngAfterViewChecked(): void {
    this.updateUser();  
  }

  ngOnInit(): void {
    this.updateUser();
  }

}
