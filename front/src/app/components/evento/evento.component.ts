import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  eventoId!: string;
  evento: any;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventoId = params.get('id')!;
      this.eventService.getEvento(this.eventoId).subscribe((data: any) => {
        this.evento = data[0];
        console.log("evento",this.evento);
      });
    });
  }
}
