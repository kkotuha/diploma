import { TripComponent } from "../component/trip.js";

export class Trip {
  trip;
  
  constructor() {
    this.trip = new TripComponent();
  }

  async buildTrip(req, res) {
    try {
      const { from, to } = req.query;
      const trip = await this.trip.buildTrip(from, to);
      res.send(trip);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async buildTrip2(req, res) {
    try {
      const { from, to, route_name } = req.query;
      const trip = await this.trip.buildTrip(from, to, route_name);
      res.send(trip);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
  
  async infoTrip(req, res) {
    try {
      const { id } = req.query;
      const trip = await this.trip.infoTrip(id);
      res.send(trip);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
    
  }
    async suggestionTrip(req, res) {
      try {
        const likeName = req.query.name;
        if (likeName && typeof likeName !== 'string') {
          res.status(400).send('Bad request');
          return;
        }
        const rows = await this.trip.suggestionTrip(likeName);
        res.send(rows);
      } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
  
}
}
