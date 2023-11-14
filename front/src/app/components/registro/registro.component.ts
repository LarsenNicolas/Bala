import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, AbstractControl, Validators, ValidationErrors, AsyncValidatorFn, AsyncValidator } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registerForm;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, this.passwordFormatValidator]),
    });

  }

  get f(){
    return this.registerForm.controls;
  }

    // Validación formato de contraseña
    passwordFormatValidator(control: AbstractControl): ValidationErrors | null {
      let password: string = control.value;
      let errors: ValidationErrors = {};
  
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const digitRegex = /\d/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
      if (password) {
        if (password.length < 13)
          errors['quantity'] = true;
        
        if (!uppercaseRegex.test(password))
          errors['uppercase'] = true;
        
        if(!lowercaseRegex.test(password))
          errors['lowercase'] = true;
        
        if(!digitRegex.test(password))
          errors['digit'] = true;
        
        if(!specialCharRegex.test(password))
          errors['specialChar'] = true;
      }
      
      if(Object.keys(errors).length > 0)
        errors['invalidFormat'] = true;
  
      return errors;
    }


  onSubmit(data: any) {

    this.http.post('http://localhost:3000/api/signUp', data).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/autenticacion']);
      },
      (error) => {
        console.error(error.error.message);
      }
    );
  }
}
