import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { Login } from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: any;
  isUserNameEmpty: any;
  isPasswordEmprt: any;
  loginForm: FormGroup;
  logins: Login = {
    username: '',
    password: ''
  }
  constructor(private service:GlobalService, private route: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Login');
    this.service.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged
      }
    )
    this.service.checkLogStatus();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.service.httpLogin(this.loginForm.value);
      this.service.onHttpLogin.subscribe(
        (response: any) => {
          const token = response.token;
          this.service.setToken(token);
          Swal.fire(
            'Logged In Successfully',
            '',
            'success'
          )
          this.route.navigate(['/']);
        }
      );
    } else {
      Swal.fire(
        'Form Field required',
        'Please complete all required fields',
        'warning'
      );
    }

  }

}
