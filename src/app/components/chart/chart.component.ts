import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  nameDevice: String;

  @Input()
  values: any;

  @Input()
  dates: any;


  public chart: any = null;


  constructor() { }

  ngOnInit(): void {
    this.showData()
  }


  showData() {
    this.chart = new Chart('realtime', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data',
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
    this.chart.data.labels = this.values;
    this.chart.data.datasets[0].data= this.values;
    this.chart.update();
  }

  onMessage(message){
    let chartTime: any = new Date();
    chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
    const valorDecMessage = 25;
    if (this.chart.data.labels.length > 15) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
    }
    this.chart.data.labels.push(chartTime); //Eje X, el 
    this.chart.data.datasets[0].data.push(valorDecMessage);//cada vez que llegue un mensaje de la suscripcion
    this.chart.update();
    
  }

}
