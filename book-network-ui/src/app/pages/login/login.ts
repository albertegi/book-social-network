import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import {response} from 'express';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).then((response)=>{
      // save token
      this.router.navigate(['books']);
      })
      .catch((err)=>{
        this.errorMsg = err?.error?.message ? [err.error.message] : ['Login failed'];
      });

  }

  register() {
    this.router.navigate(['register'])

  }
}
