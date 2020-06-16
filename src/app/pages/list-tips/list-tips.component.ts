import { Component, OnInit } from '@angular/core';
import { TipService } from 'src/app/services/tip.service';
import { Tip } from 'src/app/models/tip';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tips',
  templateUrl: './list-tips.component.html',
  styleUrls: ['./list-tips.component.scss']
})
export class ListTipsComponent implements OnInit {

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

  tips: Array<Tip>;
  userId: string;
  role: number
  constructor(private tipService: TipService, private router: Router) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('id');
    this.role = Number(localStorage.getItem('role'));

    if (!this.userId || this.role != 1) {
      this.router.navigateByUrl('/login');
    } else {
      this.getAllTips();
    }
  }

  getAllTips() {
    this.tipService.getAllTips().subscribe(data => {
      this.tips = data;
    });
  }

  createTip() {
    Swal.fire({
      title: 'Ingresa el contenido del Tip 😃',
      input: 'text',
      inputPlaceholder: 'Regar tu planta',
      showCancelButton: true,
    }).then((value) => {
      if (value.value) {

        const tip: Tip = {
          message: String(value.value)
        }
      
        this.tipService.createTip(tip).subscribe(
          (data) => {
            this.getAllTips();
            Swal.fire({
              icon: 'success',
              title: 'Genial',
              text: 'Se ha registrado el nuevo consejo!',
            });
          },
          (err) => {
            this.showErrorMessage(
              err,
              'No pudimos crear el nuevo consejo'
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
