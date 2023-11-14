import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  authenticationForm;
  
  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router: Router) {
    this.authenticationForm = this.formBuilder.group({
      username: '',
      confirmationCode: ''
    });
  }

  onSubmit(data: any) {
    this.http.post('http://localhost:3000/api/confirmRegistration', data).subscribe((response) => {
      console.log('Autenticacion exitosa:', response);
      this.router.navigate(['/home']);
    });
  }
}
