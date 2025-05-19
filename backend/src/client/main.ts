import { IVehicle, IVehicleDb, IVehiclePerformance } from '@shared/types'
import { registerNuiCallback, sendNuiMessage } from './modules/nui'
import {
  applyVehicleState,
  getMaximumVehicularPerformance,
  spawnVehicle,
  vehicleDbToClient,
} from './modules/vehicle'
import { createPreviewCamera } from './modules/camera'

let previewVehicle: number = 0
let previewCamera: number = 0

const maxVehiclePerformance: IVehiclePerformance =
  getMaximumVehicularPerformance()

const clearPreview = () => {
  if (previewVehicle) {
    if (DoesEntityExist(previewVehicle)) {
      SetEntityAsNoLongerNeeded(previewVehicle)
      DeleteEntity(previewVehicle)
    }
    previewVehicle = 0
  }
  if (previewCamera) {
    DestroyCam(previewCamera, false)
    RenderScriptCams(false, false, 0, true, false)
    previewCamera = 0
  }

  SetEntityVisible(PlayerPedId(), true, false)
}

registerNuiCallback('close', async () => {
  sendNuiMessage('show', false)
  SetNuiFocus(false, false)
  clearPreview()
})

registerNuiCallback('spawnVehicle', async (plate: string) => {
  emitNet('garage:spawnVehicle', plate)
  sendNuiMessage('show', false)
  SetNuiFocus(false, false)
  clearPreview()
})

registerNuiCallback('previewVehicle', async (vehicle: IVehicle) => {
  clearPreview()

  previewVehicle = await spawnVehicle(vehicle, false)
  applyVehicleState(previewVehicle, vehicle)

  FreezeEntityPosition(previewVehicle, true)

  previewCamera = createPreviewCamera(previewVehicle)

  SetEntityVisible(PlayerPedId(), false, false)
})

onNet('garage:openGarage', async (vehiclesDb: IVehicleDb[]) => {
  const vehicles: IVehicle[] = vehiclesDb.map(vehicleDbToClient)
  sendNuiMessage('maxVehiclePerformance', maxVehiclePerformance)
  sendNuiMessage('vehicles', vehicles)
  sendNuiMessage('show', true)
  SetNuiFocus(true, true)
})

onNet('garage:spawnVehicle', async (vehicleDb: IVehicleDb) => {
  const vehicle = vehicleDbToClient(vehicleDb)
  const veh = await spawnVehicle(vehicle)
  applyVehicleState(veh, vehicle)

  SetPedIntoVehicle(PlayerPedId(), veh, -1)

  TriggerEvent('chat:addMessage', {
    args: [
      'Garage',
      `Veículo ${vehicle.model} com placa ${vehicle.plate} foi spawnado.`,
    ],
  })
})
