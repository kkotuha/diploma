import { VehicleComponent } from "../component/vehicle.js";

export class Vehicle {
  vehicle;

  constructor() {
    this.vehicle = new VehicleComponent();
  }

  async infoVehicle(req, res) {
    try {
      const id = req.query.id;
      if (!id || typeof id !== 'string') {
        res.status(400).send('Bad request');
        return;
      }
      const wrapId = parseInt(id);
      if (isNaN(wrapId)) {
        res.status(400).send('Bad request');
        return;
      }
      const row = await this.vehicle.infoVehicle(wrapId);
      res.send(row);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
}