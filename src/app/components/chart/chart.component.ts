import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { StompService } from "@stomp/ng2-stompjs";
import {Message} from '@stomp/stompjs';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  nameDevice: String;

  @Input()
  position: string;

  @Input()
  values: [];

  @Input()
  dates: [];

  @Input()
  potId: number;

  @Input()
  deviceId: number;
 
  public chart: any = null;
  messages: Observable<Message>;
  subscription: Subscription;

  constructor(private stompService: StompService,) { }

  ngOnInit(): void {

    const topic = `/topic/pot_${this.potId}`;
    this.messages = this.stompService.subscribe(topic);
    this.subscription = this.messages.subscribe(this.onMessage);
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {this.showData()});
  }

  showData() {
    this.chart = new Chart(this.position, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Valor sensado',
            fill: false,
            data: [],
            backgroundColor: '#538f6a',
            borderColor: '#aebd77'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white"
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.setInitialData();
  }

  setInitialData(){
    this.chart.data.labels = this.dates.map(date => {
      let formatDate: string = date;
      return formatDate.split("T")[1].split(".")[0];
    });

    this.chart.data.datasets[0].data= this.values;
    this.chart.update();
  }

  public onMessage = (message: Message) => {
    const body = message.body;
    let data = body.split(":");
    this.verifyIncomingData(data[0], data[1]);
  }

  verifyIncomingData(deviceId, value) {
    const deviceIdNumber = Number(deviceId);
    const valueNumber = Number(value);

    if (deviceIdNumber === this.deviceId) {
      this.insertData(valueNumber);
    }
  }

  insertData(value){
    let chartTime: any = new Date();
    chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) +
     ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
    
    if (this.chart.data.labels.length > 15) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
    }
    this.chart.data.labels.push(chartTime); //Eje X, el 
    this.chart.data.datasets[0].data.push(value);//cada vez que llegue un mensaje de la suscripcion
    this.chart.update();
    
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
    this.subscription.unsubscribe();
  }
}
