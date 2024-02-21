import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  userdata: any
  frienList: any;
  chatData: any;
  addFriendForm!: FormGroup;

  constructor(private chatserive: ChatService, private cdr: ChangeDetectorRef, private router: Router, private fb :FormBuilder) {
    this.addFriendForm = this.fb.group({
      name : ['' ,Validators.required],
      userName : ['' ,Validators.required],
    })
   }

  ngOnInit() {
    this.chatserive.get('user').subscribe((res: any) => {
      console.log(res, "123")
      this.userdata = res
      this.chatserive.get(`/getfriends/${this.userdata._id}`).subscribe((res: any) => {
        this.frienList = res.friendList
      })
    })
  }

  addFriend() {

  }

  seletedUser(friend: any) {
    this.chatserive.get(`getchats/${friend.chatId}`).subscribe((res:any)=>{
      this.chatData = res.chats
      console.log(this.chatData , 'chats')
    })  
  }

  Logout() {
    this.chatserive.delete('logout').subscribe((res: any) => {
      this.router.navigate(['/'])
    })
  }

}