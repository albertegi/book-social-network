import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //create a setter method called token to receive the token
  set token(token: string){
    localStorage.setItem('token', token);
  }

  // then getting the token
  get token(){
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if (!token){
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check the expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token)
    if (isTokenExpired){
      localStorage.clear();
      return false
    }
    return true;
  }
}
