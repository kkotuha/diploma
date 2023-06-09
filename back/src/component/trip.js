import { db } from '../service/db.js';

export class TripComponent {
  constructor() {
  }

  async buildTrip(from, to) {
    const [rows] = await db.execute(
      'SELECT s1.*, r.* FROM SCHEDULE s1 left join SCHEDULE s2 on s1.v_on_r_id=s2.v_on_r_id left join VEICHLES_ON_ROUTE v on s1.v_on_r_id=v.v_on_r_id left join ROUTE r on v.route_no=r.route_no WHERE s1.stop_id = ? AND s2.stop_id = ?',
      [from, to]
    );
    if (rows.length === 0) {
      throw new Error('Trip not found');
    }
    return rows[0];
  }

  async infoTrip(id) {
    const [rows] = await db.execute(
      'SELECT r.* FROM ROUTE r WHERE r.route_no = ?',
      [id]
    );
    if (rows.length === 0) {
      throw new Error('Trip not found');
    }
    return rows[0];
  }
}
