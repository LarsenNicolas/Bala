import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() evento: any;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(): void {
    this.carritoService.agregarAlCarrito(this.evento);
  }
}
