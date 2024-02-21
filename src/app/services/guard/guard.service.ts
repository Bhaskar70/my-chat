import { Injectable } from '@angular/core';
import { ChatService } from '../chat/chat.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(
    private router: Router,
    private chatservice: ChatService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(true)
  }
}
