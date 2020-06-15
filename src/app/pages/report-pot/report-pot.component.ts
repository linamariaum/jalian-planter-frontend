import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { PotServiceService } from 'src/app/services/pot-service.service';
import { FormatSensorValuesService } from 'src/app/services/format-sensor-values.service';


@Component({
  selector: 'app-report-pot',
  templateUrl: './report-pot.component.html',
  styleUrls: ['./report-pot.component.scss']
})
export class ReportPotComponent implements OnInit {

  sensorValues: Array<any> = []
  params: Subscription;
  pot: any = {};
  data :any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potService: PotServiceService,
    private formatValuesService: FormatSensorValuesService) { }

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
          });

        }, err => {
          alert("No existe la matera con ese identificador");
          //Devolver a la lista por ruta directa
        });
      }
      else {
        alert("No hay id");
      }
    }, err => {
      alert("Problemas con la suscripción");
    });
  }

  ngOnDestroy(): void {
    this.params.unsubscribe();
  }

}
