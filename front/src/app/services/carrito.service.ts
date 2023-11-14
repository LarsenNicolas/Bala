import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private carrito: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  agregarAlCarrito(item: any): void {
    this.carrito.push(item);
    this.actualizarCarritoEnLocalStorage();
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  private actualizarCarritoEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  eliminarDelCarrito(index: number): void {
    this.carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')!) : [];
    this.carrito.splice(index, 1);
    this.actualizarCarritoEnLocalStorage();
  }

  async comprar(): Promise<any> {
    const data = this.obtenerCarrito()
    this.http.post('http://localhost:3000/api/comprar', data).subscribe((response: any) => {
      console.log(response);
      this.carrito = [];
      this.actualizarCarritoEnLocalStorage();
      this.router.navigate(['/home']);
    });
  }

}
