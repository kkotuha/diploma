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
}
