import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss']
})
export class ListDevicesComponent implements OnInit {

  colorsBackground: Array<string> = [
    'background-green-dark',
    'background-green-ligth',
    'background-green-cake',
    'bg-dark'];
  clase = [
    `card text-white ${this.colorsBackground[0]}`,
    `card text-white ${this.colorsBackground[1]}`,
    `card text-white ${this.colorsBackground[2]}`,
    `card text-white ${this.colorsBackground[3]}`
  ];

  devices: Array<Device>;
  userId: string;
  role: number;


  constructor(private router: Router, private devieService: DeviceService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.role = Number(localStorage.getItem('role'));

    if (!this.userId || this.role != 1) {
      this.router.navigateByUrl('/login');
    } else {
      this.getAllDevices();
    }
  }

  getAllDevices() {
    this.devieService.getAllDevices().subscribe(data => {
      this.devices = data;
    });
  }

  createDevice() {
    Swal.fire({
      title: 'Ingresa el nombre de nuestro nuevo alido 😃',
      input: 'text',
      inputPlaceholder: 'Nivel del agua',
      showCancelButton: true,
    }).then((value) => {
      if (value.value) {

        const device: Device = {
          name: String(value.value)
        }
      
        this.devieService.createDevie(device).subscribe(
          (data) => {
            this.getAllDevices();
            Swal.fire({
              icon: 'success',
              title: 'Genial',
              text: 'Se ha registrado el nuevo dispositivo!',
            });
          },
          (err) => {
            this.showErrorMessage(
              err,
              'No pudimos crear el nuevo dispositivo'
            );
          }
        );
      }
    });
  }

  showErrorMessage(error, message) {
    if (error.status === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error con nuestros servidores 😢'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: message
      });
    }
  }

}
