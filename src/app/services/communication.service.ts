import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private messageSource = new BehaviorSubject<string>('user');
  currentMessage = this.messageSource.asObservable();

  private usernameSource = new BehaviorSubject<string>('user');
  currentUsername = this.usernameSource.asObservable();

  sendMessage(message: string) {
    console.log('🔄 Enviando mensaje desde el servicio:', message);
    this.messageSource.next(message);
  }

  sendUsername(username: string) {
    console.log('🔄 Enviando nombre de usuario:', username);
    this.usernameSource.next(username);
  }
}
