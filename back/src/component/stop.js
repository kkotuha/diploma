import { db } from '../service/db.js';

export class StopComponent {
  constructor() {}

  async suggestionStop(likeName) {
    const [rows] = await db.execute(
      'SELECT * FROM STOP WHERE name LIKE ? limit 20',
      [(likeName || '')]
    );
    return rows;
  }

  async infoStop(id) {
    const [rows] = await db.execute(
      'SELECT s.name, r.route_name, sc.arrial_time, r.price FROM STOP s left join SCHEDULE sc on s.stop_id=sc.stop_id left join VEICHLES_ON_ROUTE v on v.v_on_r_id=sc.v_on_r_id left join ROUTE r on r.route_no=v.route_no WHERE s.stop_id = ? limit 1',
      [id]
    );
    return rows[0];
  }
}
