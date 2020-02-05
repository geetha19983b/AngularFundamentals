import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { ISession } from '../shared/event.model'

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left:20px; padding-right: 20px; }
    .event-image { height: 100px; }
    a {cursor:pointer}
  `]
})
export class EventDetailsComponent {
  event:any
  addMode:boolean
  filterBy: string = 'all';
  sortBy: string = 'votes';
  
  constructor(private eventService:EventService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    /* this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.event =this.eventService.getEvent(id)
          
      }
    }); */  
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    }); 
  }
  addSession() {
    this.addMode = true
  }
  saveNewSession(session:ISession) {
    let sessid;
    
    if (Array.isArray(this.event.sessions) && this.event.sessions.length) 
    {
      sessid=Math.max.apply(null, this.event.sessions.map(s => s.id));
    }
    else
    {
      sessid = 1;
      this.event.sessions=[];
    }
    const nextId = sessid;
    session.id = nextId + 1;
    this.event.sessions.push(session)
    //this.eventService.updateEvent(this.event)
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false
  }

  cancelAddSession() {
    this.addMode = false
  }

}