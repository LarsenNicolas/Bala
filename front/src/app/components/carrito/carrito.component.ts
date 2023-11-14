import { ChangeDetectorRef, OnChanges, OnInit, DoCheck, Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})

export class CarritoComponent implements OnInit, OnChanges, DoCheck {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  ngOnChanges(): void {
    this.actualizarCarrito();
  }

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  private actualizarCarrito(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  eliminarDelCarrito(index: number): void {
    this.carritoService.eliminarDelCarrito(index);
    this.actualizarCarrito();
  }

  async comprar(): Promise<any> {
    this.carritoService.comprar();
  }
}
