import { Component, OnInit } from '@angular/core';
import { StompService } from "@stomp/ng2-stompjs";

import {Message} from '@stomp/stompjs';
import {Observable, Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { PotServiceService } from 'src/app/services/pot-service.service';
import { FormatSensorValuesService } from 'src/app/services/format-sensor-values.service';


@Component({
  selector: 'app-report-pot',
  templateUrl: './report-pot.component.html',
  styleUrls: ['./report-pot.component.scss']
})
export class ReportPotComponent implements OnInit {

  messages: Observable<Message>;
  subscription: Subscription;
  sensorValues: Array<any> = []
  params: Subscription;
  pot: any = {};
  data :any;

  constructor(
    private stompService: StompService,
    private route: ActivatedRoute,
    private router: Router,
    private potService: PotServiceService,
    private formatValuesService: FormatSensorValuesService) { }

  ngOnInit(): void {

    this.params = this.route.params.subscribe(params => {
      const potId = params['id'];

      if (potId) {

        //Traer la información de la plnata
        this.potService.getPodByid(potId).subscribe(data => {
          this.pot = data;

          this.potService.getMessagesOfAPot(potId).subscribe(data => {
            // Cada sensor separado en un vector
            this.sensorValues = this.formatValuesService.formatSensorData(data);
          });

        }, err => {
          alert("No existe la matera");
        });

        //Esto lo hace cada sensor
        const topic = `/topic/pot_${potId}`;
        this.messages = this.stompService.subscribe(topic);
        this.subscription = this.messages.subscribe(this.on_message);
      }
      else {
        alert("No hay id");
      }
    }, err => {
      alert("Redirija");
    });
  }

  //Cada sensor se subscribe
  public on_message = (message: Message) => {
    const body = message.body;
    let data = body.split(":");
 
    for (let sensor of this.sensorValues) {
      if (sensor.id == data[0]) {
        sensor.values.push(Number(data[1]));
        sensor.dates.push("Otra fecha");
        break;
      } 
    }
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
    this.subscription.unsubscribe();
    this.params.unsubscribe();

  }

}
