import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
    this.service.deleteToken();
    this.route.navigate(['/']);
  }

}
