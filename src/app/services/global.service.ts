import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Login } from '../pages/login/login-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  onHttpGetTickets = new Subject();
  subjectName = new Subject();

  constructor(private http: HttpClient) { }

  httpLogin(logins: Login) {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this.http.post(url, logins).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        }
      },
      (error) => {
        console.log('error response', error);
        Swal.fire(
          'An Error Occured',
          'Unauthorized Access!',
          'error'
        )
      }
    );
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('error response in httpGetProfile', error);
      }
    );
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.onHttpUpdateProfile.next(response.data);
          this.onHttpGetProfile.next(response.data);
          Swal.fire(
            'Profile Successfully Updated',
            '',
            'success'
          );
        }
      }
    )
  }

  httpGetTickets(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my?exclude_signature=1';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.onHttpGetTickets.next(response.data);
        }
      },
      (error) => {
        console.log('error response in httpGetProfile', error);
      }
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token?.toString() || ''; // return token;
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

  getTitle(): void {

  }
}
