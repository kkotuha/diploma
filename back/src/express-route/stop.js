import { StopComponent } from "../component/stop.js";

export class Stop {
  stop;

  constructor() {
    this.stop = new StopComponent();
  }

  async suggestionStop(req, res) {
    try {
      const likeName = req.query.name;
      if (likeName && typeof likeName !== 'string') {
        res.status(400).send('Bad request');
        return;
      }
      const rows = await this.stop.suggestionStop(likeName);
      res.send(rows);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  async infoStop(req, res) {
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
      const row = await this.stop.infoStop(wrapId);
      res.send(row);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
}
