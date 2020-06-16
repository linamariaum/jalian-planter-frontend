import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { PotServiceService } from 'src/app/services/pot-service.service';
import { FormatSensorValuesService } from 'src/app/services/format-sensor-values.service';
import { Pot } from 'src/app/models/pot';
import Swal from 'sweetalert2';
import { Tip } from 'src/app/models/tip';
import { TipService } from 'src/app/services/tip.service';


@Component({
  selector: 'app-report-pot',
  templateUrl: './report-pot.component.html',
  styleUrls: ['./report-pot.component.scss']
})
export class ReportPotComponent implements OnInit {

  sensorValues: Array<any> = []
  tips : Array<Tip>;
  params: Subscription;
  pot: Pot = {
    id: 0,
    name: '',
    type: '',
  };
  data :any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potService: PotServiceService,
    private formatValuesService: FormatSensorValuesService,
    private tipService: TipService) { }

  ngOnInit(): void {

    this.params = this.route.params.subscribe(params => {
      const potId = params['id'];

      if (potId) {

        //Traer la información de la planta
        this.potService.getPodByid(potId).subscribe(data => {
          this.pot = data;

          //Tomar todos los mensajes enviados por un sensor
          this.potService.getMessagesOfAPot(potId).subscribe(data => {
            // Cada sensor separado en un vector
            this.sensorValues = this.formatValuesService.formatSensorData(data);
          }, err => {
            this.showErrorMessage(err, 'Los sensores de tu maceta aún no recolectan información!');
          });

          //Tomar todos los tips
          this.tipService.getAllTips().subscribe(tips => {
            this.tips = tips;
          }, err => {
            this.showErrorMessage(err, 'No hay tips hoy para tu planta!');
          });

        }, err => {
          this.showErrorMessage(err, 'La maceta con ese identificador no hace parte de tu familia!');
          this.router.navigate(['pots']);
        });
      }
      else {
        alert("No hay id");
      }
    }, err => {
      alert("Problemas con la suscripción");
    });
  }

  showErrorMessage(error, message) {
    if (error.status === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error con nuestros servidores 😢'
      })

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: message
      })
    }
  }

  ngOnDestroy(): void {
    this.params.unsubscribe();
  }

}
