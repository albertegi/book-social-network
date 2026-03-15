import { Injectable } from '@angular/core';

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
}
