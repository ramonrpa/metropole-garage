export interface IVehicleDb {
  id: number
  owner: string
  model: string
  plate: string
  fuel: number
  body_health: number
  engine_health: number
  primary_color: string
  secondary_color: string
  modifications: string
}

export interface IVehicleMod {
  type: number;
  value: number;
}

export interface IVehicle {
  model: string
  modelName: string
  vehicleClass: string
  primaryColor?: number[]
  secondaryColor?: number[]
  plate: string
  fuel: number
  bodyHealth: number
  engineHealth: number
  acceleration: number
  speed: number
  braking: number
  modifications: IVehicleMod[]
}

export interface IVehiclePerformance {
  acceleration: number
  speed: number
  braking: number
}