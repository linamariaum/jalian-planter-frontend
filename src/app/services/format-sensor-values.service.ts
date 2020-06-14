import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatSensorValuesService {

  constructor() { }

  public formatSensorData (sensorValues) {
    const sensorsInformation = []; 
    let previousSensorId = 0;

    let sensorInfo = {
      id: 0,
      name: 'Algo',
      dates: [],
      values: []
    }

    for (let message of sensorValues) {
      if (message.potDevice.device.id != previousSensorId) {

        if (sensorInfo.id !== 0) {
          sensorsInformation.push(sensorInfo);
        } 
        sensorInfo = {
          id: message.potDevice.device.id,
          name: message.potDevice.device.name,
          dates: [],
          values: []
        }
        previousSensorId = message.potDevice.device.id
      }
      sensorInfo.dates.push(message.createdDate);
      sensorInfo.values.push(message.value);
    }

    sensorsInformation.push(sensorInfo);

    return sensorsInformation;
  }
}
