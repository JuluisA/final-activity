import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  isLogged: any;
  constructor(private service: GlobalService, private route: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('My Tickets');
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged
      }
    )
    this.service.checkLogStatus();

    if (!this.isLogged) {
      Swal.fire(
        'An Error Occured',
        'Unauthorized Access!',
        'error'
      )
      this.route.navigate(['/']);
    }
  }

}
