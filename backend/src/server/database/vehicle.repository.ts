import { RowDataPacket } from 'mysql2'
import { pool } from './index'
import { IVehicleDb } from '@shared/types'

export class VehicleRepository {
  static async getByPlate(plate: string) {
    const [rows] = await pool.query<RowDataPacket[][]>(
      'SELECT * FROM vehicles WHERE plate = ?',
      [plate]
    )
    return rows[0] as unknown as IVehicleDb | undefined
  }

  static async listByOwner(owner: string) {
    const [rows] = await pool.query<RowDataPacket[][]>(
      'SELECT * FROM vehicles WHERE owner = ?',
      [owner]
    )
    return rows as unknown as IVehicleDb[]
  }
}
