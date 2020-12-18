import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  background = 'dark';
  isLogged: any;
  constructor(private service: GlobalService, private route: Router) { }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    )
    this.service.checkLogStatus();
  }

  onLogout(): void {
    Swal.fire(
      'Logged Out Successfully',
      '',
      'success'
    );
    this.service.deleteToken();
    this.route.navigate(['/']);

  }



}
