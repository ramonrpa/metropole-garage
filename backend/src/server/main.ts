import { VehicleRepository } from './database/vehicle.repository'

declare function GetPlayerIdentifierByType(
  playerSrc: string,
  identifierType: string
): string
declare function IsPlayerAceAllowed(playerSrc: string, object: string): boolean

RegisterCommand(
  'garage',
  async (source: number) => {
    const playerIdentifier = GetPlayerIdentifierByType(
      String(source),
      'license'
    )
    const vehicles = await VehicleRepository.listByOwner(playerIdentifier)
    emitNet('garage:openGarage', source, vehicles)
  },
  false
)

RegisterCommand(
  'car',
  async (source: number, args: string[]) => {
    if (!IsPlayerAceAllowed(String(source), 'garage.admin')) {
      emitNet('chat:addMessage', source, {
        args: ['Garage', 'Você não tem permissão para usar este comando.'],
      })
      return
    }

    const plate = args[0]
    if (!plate) {
      emitNet('chat:addMessage', source, {
        args: ['Garage', 'Por favor, forneça uma placa.'],
      })
      return
    }

    const vehicle = await VehicleRepository.getByPlate(plate)
    if (!vehicle) {
      emitNet('chat:addMessage', source, {
        args: ['Garage', 'Veículo não encontrado.'],
      })
      return
    }

    emitNet('garage:spawnVehicle', source, vehicle)
  },
  false
)

onNet('garage:spawnVehicle', async (plate: string) => {
  const source = global.source

  const vehicle = await VehicleRepository.getByPlate(plate)
  if (!vehicle) {
    emitNet('chat:addMessage', source, {
      args: ['Garage', 'Veículo não encontrado.'],
    })
    return
  }

  emitNet('garage:spawnVehicle', source, vehicle)
})
