import { db } from '../service/db.js';

export class TripComponent {
  constructor() {
  }

  async buildTrip(from, to) {
    const [rows] = await db.execute(
      'SELECT s1.*, r.*, r.route_name, s1.arrial_time, st1.name as stop_name1, st2.name as stop_name2 FROM SCHEDULE s1 left join SCHEDULE s2 on s1.v_on_r_id=s2.v_on_r_id left join VEICHLES_ON_ROUTE v on s1.v_on_r_id=v.v_on_r_id left join ROUTE r on v.route_no=r.route_no left join STOP st1 on st1.stop_id=s1.stop_id left join STOP st2 on st2.stop_id=s2.stop_id WHERE s1.stop_id = ? AND s2.stop_id = ?',
      [from, to]
    );
  
    if (rows.length === 0) {
      throw new Error('Trip not found');
    }
  
    const uniqueRoutes = [...new Set(rows.map(row => row.route_name))];
    const uniqueRoutes1 = [...new Set(rows.map(row => row.arrial_time))];
  
    return {
      stop_name1: rows[0].stop_name1,
      stop_name2: rows[0].stop_name2,
      stops: uniqueRoutes,
      stops1: uniqueRoutes1
    };
  }


  async buildTrip2(from, to, route_name ) {
    const [rows] = await db.execute(
      'SELECT r.*, r.route_name, timediff(s2.arrial_time, s1.arrial_time) as arrial_time , st1.name as stop_name1, st2.name as stop_name2 FROM SCHEDULE s1 left join SCHEDULE s2 on s1.v_on_r_id=s2.v_on_r_id left join VEICHLES_ON_ROUTE v on s1.v_on_r_id=v.v_on_r_id left join ROUTE r on v.route_no=r.route_no left join STOP st1 on st1.stop_id=s1.stop_id left join STOP st2 on st2.stop_id=s2.stop_id  WHERE s1.stop_id = ? AND s2.stop_id = ? and route_name = ?',
            [from, to, route_name]
    );
  
    if (rows.length === 0) {
      throw new Error('Trip not found');
    }
    return rows[0];
  }

  async infoTrip(id) {
    const [rows] = await db.execute(
      'SELECT r.route_name as route_name,GROUP_CONCAT(s.arrial_time ORDER BY s.arrial_time asc ) as arrial_time, GROUP_CONCAT(st.name ORDER BY arrial_time) as stop_name FROM route r join veichles_on_route v on v.route_no = r.route_no join diploma.schedule s on s.v_on_r_id = v.v_on_r_id  join stop st on st.stop_id = s.stop_id where r.route_no = ? GROUP BY r.route_name',
      [id]
    );
    if (rows.length === 0) {
      throw new Error('Trip not found');
    }
    return rows[0];
  }
  async suggestionTrip(likeName) {
    const [rows] = await db.execute(
      'SELECT route_no FROM ROUTE WHERE route_name LIKE ? limit 20',
      ['%' + (likeName || '') + '%']
    );
    return rows;
  }
}
