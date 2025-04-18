import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Packet } from '../models/packet.model';
import { PacketService } from '../services/packet.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-packet',
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  templateUrl: './packet.component.html',
  styleUrl: './packet.component.css'
})
export class PacketComponent implements OnInit{
  searchTerm: string = ''; // Término de búsqueda
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  packetsList: Packet[] = []; // Lista completa de pacquetes
  displayedPackets: Packet[] = []; // Paquetes visibles en la página actual    totalItems = 0; // Número total de elementos
  totalItems = 0; // Número total de elementos
  itemsPerPage = 3; // Elementos por página
  currentPage = 0; // Página actual
  paquetesSeleccionados: Packet[] = []; // Almacena los paquetes del usuario seleccionado
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtainPackets();
  }
  packetService = inject(PacketService);
  userService = inject(UserService);
  obtainPackets(): void {
    this.packetService.getPackets(this.currentPage + 1, this.itemsPerPage).subscribe({
      next: (response) => {
        this.packetsList = response.data.map(packet => ({
          ...packet
        }));
        this.displayedPackets = this.packetsList; // Actualiza los paquetes mostrados
        this.totalItems = response.totalPackets;
        console.log(this.packetsList, this.totalItems);
        this.cdr.detectChanges();
        if (this.packetsList.length > 0) {
          console.log(this.packetsList[0].name); // Ahora no dará error
        }
      },
      error: (error) => {
        console.error('Error al obtener paquetes:', error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.obtainPackets(); // Llama a la función para obtener los paquetes de la nueva página
  }

  trackByPacketId(index: number, packet: any): string {
    return packet?._id || index.toString(); // Asegura que siempre se devuelva un valor válido
  }

  toggleSeleccion(packet: Packet): void {
    packet.seleccionado = !packet.seleccionado;
    console.log(packet.seleccionado);
  }

  confirmarAsignacion(): void {
    this.paquetesSeleccionados = this.packetsList.filter(packet => packet.seleccionado); // Filtra los usuarios seleccionados
    console.log('Usuarios seleccionados:', this.paquetesSeleccionados);
    if (this.paquetesSeleccionados.length === 0) {
      alert('No hay paquetes seleccionados para asignar.');
      return;
    }
    this.mostrarModal = true; // Muestra el modal
  }

  search(){
    console.log(this.searchTerm);
    this.paquetesSeleccionados.map(packet => {
    this.userService.assignPacketsToUser(this.searchTerm, packet._id).subscribe({
      next: (response) => {
        console.log('Paquete asignado:', response);
        alert('Paquete asignado correctamente.');
        this.mostrarModal = false; // Oculta el modal
      },
      error: (error) => {
        console.error('Error al asignar paquete:', error);
        alert('Error al asignar paquete.'); // Muestra un mensaje de error
      }
    });
  });
}
}
