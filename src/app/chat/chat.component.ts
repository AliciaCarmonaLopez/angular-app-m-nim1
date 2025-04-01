import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = ''; // Mensaje a enviar
  recieverName: string = ''; // Nombre del usuario receptor
  user2name: string = ''; // Nombre del segundo usuario
  userId: string = ''; // ID del usuario
  messageList: Message[] = []; // Lista de mensajes
  constructor(private communicationService: CommunicationService) {
  }
  messageService = inject(MessageService);
  ngOnInit(): void {
    this.communicationService.currentUsername.subscribe(userId => {
      this.userId = userId;
    });
  }

  send(){
    this.messageService.postMessage(this.userId,this.recieverName, this.message).subscribe({
      next: (response) => {
        console.log('Envio exitoso:', response);

      },
      error: (error) => {
        console.error('Error en el envio:', error);
      }
    });
  }

  verHistorial() {
    this.messageService.getMessages(this.userId, this.recieverName).subscribe({
      next: (response) => {
        this.messageList = response;
        console.log('Historial de mensajes:', response);
      },
      error: (error) => {
        console.error('Error al obtener el historial de mensajes:', error);
      }
    });
  }

  deleteMessage() {

  }
}
