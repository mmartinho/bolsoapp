import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TokenService } from '../token/token.service';
import { User } from './user';
import jwtDecode from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * A diferença entre "BehaviorSubject" e "Subject", é que o "BehaviorSubject"
   * "aguarda" que a emissão seja "consumida" para, assim, completar sua tarefa,
   * o "Subject" não: ele emite, e completa
   */
  private userSubject = new BehaviorSubject<User>({ id: 0, name: '', email:'' });
  
  /** */
  private userName : string = '';

  /** */
  constructor(private tokenService: TokenService) {
    /** Se já tem um token no storage */
    if(this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  /** */
  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  /**
   * Declara a interface observável de usuário 
   * @returns Observable<User>
   */
  getUser() {
    return this.userSubject.asObservable();
  }

  /** 
   * Emite o "User" para quem estiver "ouvindo"
   */
  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if(token) {
      const user = jwtDecode(token) as User;
      this.userName = user.name;
      this.userSubject.next(user);
    }
  }

  /** */
  logout() {
    this.tokenService.removeToken();
    this.userSubject.next({id:0, name:'', email:''});
  }

  /**
   * @returns boolean
   */
  isLogged() : boolean {
    return this.tokenService.hasToken();
  }

  /**
   * @returns string
   */
  getUserName() : string {
    return this.userName;
  }
}
