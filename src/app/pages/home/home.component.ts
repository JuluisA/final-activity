import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: any;
  alias: string;
  constructor(private service: GlobalService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Home');
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    )
    this.service.checkLogStatus();

    if (this.isLogged) {
      this.service.httpGetProfile();
      this.service.onHttpGetProfile.subscribe(
        (profile: any) => {
          this.alias = profile.alias;
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.service.checkLogStatus();
  }

}
