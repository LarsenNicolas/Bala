import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logInForm;

  // mensaje de error
  error: boolean = false;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(data: any) {
    this.usuarioService.login(data).subscribe(
      (response: any) => {
        console.log('Login exitoso:', response);
        
        // guarda el nombre de usuario en el servicio
        this.usuarioService.setUsername(response.user.username);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.error = true;
      }
    );
  }
}

