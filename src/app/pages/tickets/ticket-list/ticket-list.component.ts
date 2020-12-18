import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  myTickets: any;
  constructor(private service: GlobalService) { }

  ngOnInit(): void {
    this.service.httpGetTickets();
    this.service.onHttpGetTickets.subscribe(
      (tickets: any) => {
        this.myTickets = tickets;
      }
    )
  }

}
