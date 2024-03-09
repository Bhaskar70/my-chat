import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = 'http://localhost:3000'
  private socket: Socket;
  'document': Document
  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl, { transports: ['websocket', 'polling', 'flashsocket'] });
   }
  userData = new BehaviorSubject('')
  sendSocket(url :string , data:any) {
    this.socket.emit(url, data)
  }
  getSocket(url:string): Observable<any> {
    return new Observable<{
      user: string,
      room: string,
      phone: string
    }>(observer => {
      this.socket.on(url, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }
  post(url:string,payload: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/${url}`, payload,{ withCredentials: true })
  }

  get(url :string):Observable<any> {
    return this.http.get(`${this.apiUrl}/${url}`, { withCredentials: true })
  }
  delete(url:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${url}`, { withCredentials: true })
  }
  getSocketData(){

  }
}
