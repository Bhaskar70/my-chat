import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  'loginForm' :FormGroup
  constructor(private chatService :ChatService, private fb :FormBuilder, private router :Router){
    this.loginForm = this.fb.group({
      username: ['' , [Validators.required]],
      password : ['' , [Validators.required]] ,
    })
  }

  Login(){
    console.log(this.loginForm, "form")
    if(this.loginForm.valid){
      this.chatService.post('login',this.loginForm.value).subscribe((res:any)=>{
        this.router.navigate(['/chat-page'])
      })
    }
  }
}