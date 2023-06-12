import { db } from '../service/db.js';

export class VehicleComponent {
  constructor() {
  }

  async infoVehicle(id) {
    const [rows] = await db.execute(
      'SELECT * FROM VEHICLE WHERE vehicle_no = ? limit 1',
      [id]
    );
    if (rows.length === 0) {
      throw new Error('Vehicle not found');
    }
    const [type] = await db.execute(
      'SELECT * FROM VEHICLE_TYPE WHERE vehicle_type_id = ? limit 1',
      [rows[0].vehicle_type_id]
    );
    return {
      vehicle_no: rows[0].vehicle_no,
      plate_no: rows[0].plate_no,
      isActive: rows[0].isActive,
      vehicle_type_id: rows[0].vehicle_type_id,
      vehicle_type: type[0].vehicle_type,
      vehicle_model: type[0].vehicle_model,
    };
  }
  async suggestionTrip(likeName) {
    const [rows] = await db.execute(
      'SELECT route_no FROM ROUTE WHERE route_name LIKE ? limit 20',
      ['%' + (likeName || '') + '%']
    );
    return rows;
  }
}
