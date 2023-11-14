import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string | null;

  constructor(private usuarioService: UsuarioService) {
    // obtiene el nombre de usuario del servicio
    this.username = usuarioService.getUsername();
  }
}
