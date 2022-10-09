import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** Fonte Aweson */
  faUser = faUser ;
  faBars = faBars;

  userName: string='';

  constructor(
    private userService: UserService, 
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.userName = user.name;  
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
