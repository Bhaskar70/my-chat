import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = 'http://localhost:3000/api'
  'document': Document
  constructor(private http: HttpClient) { }
  userData = new BehaviorSubject('')

  post(url:string,payload: any) {
    return this.http.post(`${this.apiUrl}/${url}`, payload,{ withCredentials: true })
  }

  get(url :string) {
    return this.http.get(`${this.apiUrl}/${url}`, { withCredentials: true })
  }
  delete(url:string){
    return this.http.delete(`${this.apiUrl}/${url}`, { withCredentials: true })
  }
}
