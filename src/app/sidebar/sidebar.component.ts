import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name: string;
  jobTitle: string;
  email: string;
  mobileNumber: string;
  isLogged: any;
  myProfile: any;
  constructor(private service: GlobalService) { }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    );
    this.service.checkLogStatus();

    if (this.isLogged) {
      this.service.httpGetProfile();
      this.service.onHttpGetProfile.subscribe(
        (profile: any) => {
          this.myProfile = profile;
        }
      )
    }

  }

}
