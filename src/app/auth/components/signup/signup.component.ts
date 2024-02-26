import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning: boolean = false;
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder
    private authService: AuthService) {}

  ngOnInit(){
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]]
    });
  }

  validateForm!: FormGroup;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register(){
    console.log(this.signUpForm.value);
    this.authService.register(this.signUpForm.value).subscribe((res) => {
      console.log(res);
    
    
    
    })
   }
   
}


