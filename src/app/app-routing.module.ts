import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OneColumnComponent } from './one-column/one-column.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TicketListComponent } from './pages/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './pages/tickets/ticket-view/ticket-view.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TwoColumnComponent } from './two-column/two-column.component';

const routes: Routes = [
  {
    path: '', component: TwoColumnComponent, children: [
      { path: '', component:HomeComponent },
      { path: 'tickets', component: TicketsComponent, children: [
        { path: '', component: TicketListComponent },
        { path: 'ticket/:id/view', component: TicketViewComponent },
        { path: '**', redirectTo: 'not-found' }
      ]},
      { path: 'my-profile', component: ProfileComponent }
    ]
  },
  { path: '', component: OneColumnComponent, children: [
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'not-found', component: OneColumnComponent, children: [
    { path: '', component: NotFoundComponent }
  ]},
  { path: '**', redirectTo: 'not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
