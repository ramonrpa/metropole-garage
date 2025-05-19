import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: '192.168.3.102',
  user: 'root',
  password: 'metropole',
  database: 'metropole',
  waitForConnections: true,
  connectionLimit: 10,
})
