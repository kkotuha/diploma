import express from 'express';
import { Trip } from './express-route/trip.js';
import { Stop } from './express-route/stop.js';
import { Vehicle } from './express-route/vehicle.js';


export async function getExpress() {
  const app = express();
  const trip = new Trip();
  const stop = new Stop();
  const vehicle = new Vehicle();


  app.use('*', (err, req, res, next) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
      return;
    }
    next()
  });

  app.get('/api/suggestion_stop', stop.suggestionStop.bind(stop));
  app.get('/api/info_stop', stop.infoStop.bind(stop));
  app.get('/api/build_trip', trip.buildTrip.bind(trip));
  app.get('/api/build_trip2', trip.buildTrip2.bind(trip));
  app.get('/api/info_trip', trip.infoTrip.bind(trip));
  app.get('/api/suggestion_trip', vehicle.suggestionTrip.bind(vehicle));
  app.get('/api/info_vehicle', vehicle.infoVehicle.bind(vehicle));
  app.all('*', (req, res) => {
    res.status(404).send('Not found');
  });

  return app;
}