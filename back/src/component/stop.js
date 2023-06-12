import { db } from '../service/db.js';

export class StopComponent {
  constructor() {}

  async suggestionStop(likeName) {
    const [rows] = await db.execute(
      'SELECT * FROM STOP WHERE name LIKE ? limit 20',
      ['%' + (likeName || '') + '%']
    );
    return rows;
  }

  async infoStop(id) {
    const [rows] = await db.execute(
      'SELECT s.name as stop_name,  GROUP_CONCAT(sc.arrial_time SEPARATOR ", ") as arrial_time, GROUP_CONCAT(r.route_name ORDER BY arrial_time ASC) as route_name FROM STOP s LEFT JOIN SCHEDULE sc ON s.stop_id = sc.stop_id  LEFT JOIN VEICHLES_ON_ROUTE v ON v.v_on_r_id = sc.v_on_r_id LEFT JOIN ROUTE r ON r.route_no = v.route_no WHERE s.stop_id = ? group by stop_name', 
      [id]
    );
    return rows[0];
  }
}
