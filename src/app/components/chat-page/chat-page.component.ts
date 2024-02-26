import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChatService } from '../../services/chat/chat.service';
import { Store } from '@ngrx/store';
import { loadChatId } from '../../store/actions';
import { chatData } from '../../store/selector';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  userdata: any
  frienList: any = [];
  chatData: any = [];
  addFriendForm!: FormGroup;
  selectedFriend: any;
  message: string = '';
  constructor(
    private chatserive: ChatService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.addFriendForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.chatserive.get('user').subscribe((res: any) => {
      console.log(res, "123")
      this.userdata = res
      this.chatserive.get(`getfriends/${this.userdata._id}`).subscribe((res: any) => {
        this.frienList = res.friendList
      })
    })

    this.chatserive.getSocket('new message').subscribe(res => {
      this.chatData.push(res)
    })
    this.store.select(chatData).subscribe((res)=>{
      console.log(res)
      if(res){
        this.chatData = JSON.parse(JSON.stringify(res))
      }

    })
  }

  addFriend() {
    if (this.addFriendForm.valid) {
      const payload = {
        chatId: uuidv4(),
        userId: this.userdata._id,
        friendId: this.addFriendForm.value.userName,
        friendName: this.addFriendForm.value.name
      }
      this.chatserive.post('addfriend', payload).subscribe((res: any) => {
        console.log(res, 'new friend')
        this.frienList = res.friendList
      })
    }
  }

  seletedUser(friend: any) {
    this.selectedFriend = friend
    this.store.dispatch(loadChatId({ id: friend.chatId }))
  }

  Logout() {
    this.chatserive.delete('logout').subscribe((res: any) => {
      this.router.navigate(['/'])
    })
  }
  sendMessage() {
    if (this.message?.length > 0) {
      this.chatserive.sendSocket('message', {
        id: this.selectedFriend.chatId, chat: {
          user: this.userdata.name,
          message: this.message,
          time: new Date().toUTCString(),
          read: false,
          type: 'text'
        }
      })
    }
  }
}