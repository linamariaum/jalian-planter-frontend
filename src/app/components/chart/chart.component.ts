import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  device = "dispositivo"

  data = [250, 219, 175, 137, 79, 50, 194, 108, 238, 72, 64, 108, 160, 184, 151, 32, 216, 84, 195, 40, 171, 195, 141, 7, 91, 200, 33, 208, 148, 171, 236, 23, 118, 242, 178, 213, 143, 179, 193, 85, 23, 95, 208, 34, 215, 149, 244, 215, 175, 86, 110, 64, 225, 107, 62, 166, 80, 1, 225, 123, 8, 5, 170, 71, 34, 34, 5, 51, 236, 23, 5, 152, 32, 102, 237, 126, 119, 189, 131, 83, 43, 16, 219, 100, 13, 24, 56, 237, 120, 102, 246, 121, 226, 178, 218, 166, 59, 198, 33, 27];

  private intervalUpdate: any = null;
  public chart: any = null;


  constructor() { }

  ngOnInit(): void {
    this.showData()
  }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
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
    this.getData()//datos a mostrar
    this.intervalUpdate = setInterval(function () {//Tiempo que dura cada salto de tiempo
      this.getData();
    }.bind(this), 500);
  }

  private getData() {

    if (this.data.length != 0) {//If para comprobar que hay datos necesarios
      let chartTime: any = new Date();
      chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      if (this.chart.data.labels.length > 25) {//cantidad de datos en el grafico
        this.chart.data.labels.shift();
        this.chart.data.datasets[0].data.shift();
      }
      this.chart.data.labels.push(chartTime); //Eje x, eje y lo toma por defecto
      this.chart.data.datasets[0].data.push(this.data.pop());//lugar donde se ingresa el dato o datos a graficar
      this.chart.update();
    } else {
      console.error("ERROR: The response had an error, retrying");
    }
  }



}
