import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:4000/api/messages";

    getMessages(senderId: string, recieverId:string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${senderId}/${recieverId}`);
    }
    postMessage(senderId:string, revieverId:string, message: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${senderId}/${revieverId}`,{message});

    }
}
