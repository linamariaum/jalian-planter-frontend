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
  messagesList: Array<String> = [];
  sensorValues: Array<any> = []
  params: Subscription;
  pot: any = {};

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
        const topic = `/topic/pot_${potId}`;
        this.messages = this.stompService.subscribe(topic);
        this.subscription = this.messages.subscribe(this.on_message);
        this.potService.getPodByid(potId).subscribe(data => {
          this.pot = data;
          console.log(this.pot);
        });

        this.potService.getMessagesOfAPot(potId).subscribe(data => {
          this.sensorValues = this.formatValuesService.formatSensorData(data);
          console.log(this.sensorValues);
        });

      }
      else {
        console.log("No llego identificador");
      }
    });
  }

  public on_message = (message: Message) => {
    const body = message.body;
    this.messagesList.push(body + '\n');
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
    this.subscription.unsubscribe();
    this.params.unsubscribe();

  }

}
