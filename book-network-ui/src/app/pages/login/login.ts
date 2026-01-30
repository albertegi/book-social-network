import { Component } from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  login() {

  }

  register() {

  }
}
