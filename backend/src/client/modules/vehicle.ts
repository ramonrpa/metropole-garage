import { IVehicle, IVehicleDb, IVehiclePerformance } from '@shared/types'
import { loadModel } from './model'

export const getMaximumVehicularPerformance = (): IVehiclePerformance => {
  const vehicleModels = GetAllVehicleModels()

  let currentMaxBraking = 0
  let currentMaxAcceleration = 0
  let currentMaxSpeed = 0

  for (const model of vehicleModels) {
    const modelBraking = GetVehicleModelMaxBraking(model)
    const modelAcceleration = GetVehicleModelAcceleration(model)
    const modelSpeed = GetVehicleModelMaxSpeed(model)

    if (modelBraking > currentMaxBraking) {
      currentMaxBraking = modelBraking
    }
    if (modelAcceleration > currentMaxAcceleration) {
      currentMaxAcceleration = modelAcceleration
    }
    if (modelSpeed > currentMaxSpeed) {
      currentMaxSpeed = modelSpeed
    }
  }

  return {
    braking: currentMaxBraking,
    acceleration: currentMaxAcceleration,
    speed: currentMaxSpeed,
  }
}

export const applyVehicleState = (vehicle: number, vehicleState: IVehicle) => {
  SetVehicleNumberPlateText(vehicle, vehicleState.plate)
  SetVehicleFuelLevel(vehicle, vehicleState.fuel)
  SetVehicleBodyHealth(vehicle, vehicleState.bodyHealth * 10)
  SetVehicleEngineHealth(vehicle, vehicleState.engineHealth * 10)

  if (vehicleState.primaryColor?.length === 3) {
    SetVehicleCustomPrimaryColour(
      vehicle,
      vehicleState.primaryColor[0],
      vehicleState.primaryColor[1],
      vehicleState.primaryColor[2]
    )
  }
  if (vehicleState.secondaryColor?.length === 3) {
    SetVehicleCustomSecondaryColour(
      vehicle,
      vehicleState.secondaryColor[0],
      vehicleState.secondaryColor[1],
      vehicleState.secondaryColor[2]
    )
  }

  for (const mod of vehicleState.modifications) {
    try {
      SetVehicleMod(vehicle, mod.type, mod.value, false)
    } catch (error) {
      console.error(`Error applying mod ${mod.type}:`, error)
    }
  }

  Entity(vehicle).state.set('vehicle:plate', vehicleState.plate, true)
  Entity(vehicle).state.set('vehicle:fuel', vehicleState.fuel, true)
  Entity(vehicle).state.set('vehicle:bodyHealth', vehicleState.bodyHealth, true)
  Entity(vehicle).state.set(
    'vehicle:engineHealth',
    vehicleState.engineHealth,
    true
  )
  Entity(vehicle).state.set(
    'vehicle:primaryColor',
    vehicleState.primaryColor,
    true
  )
  Entity(vehicle).state.set(
    'vehicle:secondaryColor',
    vehicleState.secondaryColor,
    true
  )
  Entity(vehicle).state.set(
    'vehicle:modifications',
    vehicleState.modifications,
    true
  )
}

export const spawnVehicle = async (vehicle: IVehicle, isNetwork = true) => {
  const vehicleHash = GetHashKey(vehicle.model)

  await loadModel(vehicleHash)

  const playerPed = PlayerPedId()
  const coords = GetEntityCoords(playerPed, false)

  return CreateVehicle(
    vehicleHash,
    coords[0],
    coords[1],
    coords[2],
    GetEntityHeading(playerPed),
    isNetwork,
    false
  )
}

export const vehicleDbToClient = (vehicleDb: IVehicleDb): IVehicle => {
  const modelHash = GetHashKey(vehicleDb.model)
  const vehicleClass = GetVehicleClassFromName(modelHash)

  return {
    model: vehicleDb.model,
    modelName: GetDisplayNameFromVehicleModel(modelHash),
    vehicleClass: GetLabelText('VEH_CLASS_' + vehicleClass),
    primaryColor: JSON.parse(vehicleDb.primary_color),
    secondaryColor: JSON.parse(vehicleDb.secondary_color),
    plate: vehicleDb.plate,
    fuel: vehicleDb.fuel,
    bodyHealth: vehicleDb.body_health,
    engineHealth: vehicleDb.engine_health,
    acceleration: GetVehicleModelAcceleration(modelHash),
    speed: GetVehicleModelMaxSpeed(modelHash),
    braking: GetVehicleModelMaxBraking(modelHash),
    modifications: JSON.parse(vehicleDb.modifications),
  }
}
