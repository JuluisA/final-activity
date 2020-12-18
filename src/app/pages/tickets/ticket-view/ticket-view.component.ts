import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  selectedTicket: any;
  myTickets: any;
  constructor(private router: ActivatedRoute, private service: GlobalService) { }

  ngOnInit(): void {
    this.service.httpGetTickets();
    this.service.onHttpGetTickets.subscribe(
      (tickets: any) => {
        this.myTickets = tickets;
        this.router.params.subscribe( // get the object
          (params: Params) => {
            const id = params.id;
            const selected = this.myTickets.filter(
              (ticket) => {
                return ticket.id === id;
              }
            );

            if (selected.length > 0) {
              console.log(selected[0]);

              this.selectedTicket = selected[0];
              console.log(this.selectedTicket.template.alias);
              this.service.subjectName.next(this.selectedTicket.name);
            }
          }
        );
      }
    )
  }
  ngOnDestroy(): void {
    this.service.subjectName.next('');
  }

}
