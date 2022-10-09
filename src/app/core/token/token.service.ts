import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /** */
  hasToken(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  /** */
  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  /** */
  getToken() {
    return window.localStorage.getItem(KEY);
  }

  /** */
  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
