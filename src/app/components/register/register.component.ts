import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  'registerForm': FormGroup
  constructor(private fb: FormBuilder, private chatservice: ChatService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    })
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  Register() {
    console.log(this.registerForm.valid, this.registerForm, this.registerForm.value)
    const { name, email, phone, password } = this.registerForm.value
    if (this.registerForm.valid) {
      this.chatservice.post('register',{ name, email, phone, password }).subscribe((res) => console.log(res, "register call response"))
    }
  }
}