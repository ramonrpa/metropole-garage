import type { IVehicle, IVehiclePerformance } from '@shared/types'
import { ChevronsUp, Fuel, Gauge, Weight } from 'lucide-react'
import type React from 'react'

import platePng from '../assets/images/plate.png?url'

interface Props {
  vehicle: IVehicle
  maxVehiclePerformance: IVehiclePerformance
}

export const VehicleInfo: React.FC<Props> = ({
  vehicle: { modelName, plate, acceleration, speed, braking, engineHealth },
  maxVehiclePerformance,
}) => {
  const renderInfo = (
    Icon: React.ElementType,
    label: string,
    value: number,
    maxValue: number,
    isPercent: boolean = false,
  ) => {
    const percetage = Math.round((value / maxValue) * 100)
    return (
      <li className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-medium">
            <Icon className="text-white size-4" />
            {label}
          </p>
          <p className="font-bold">
            {value.toFixed(2)}
            {isPercent && '%'}
          </p>
        </div>
        <div className="w-full h-2 bg-neutral-300/40 rounded-lg overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all"
            style={{ width: `${percetage}%` }}
          />
        </div>
      </li>
    )
  }

  return (
    <article className="min-w-80 bg-black/60 backdrop-blur-sm p-6 flex flex-col gap-4 rounded-lg">
      <header className="flex justify-between items-center gap-4">
        <div className="flex flex-col">
          <h4 className="text-lg text-brand-500 font-bold">Informações</h4>
          <p className="font-semibold text-neutral-500">{modelName}</p>
        </div>
        <div className="relative aspect-video w-24">
          <p className="relative text-center z-10 text-blue-700 mt-4">
            {plate}
          </p>
          <img
            src={platePng}
            alt="plate"
            className="w-full absolute inset-0 z-0"
          />
        </div>
      </header>
      <ul className="flex flex-col gap-3">
        {renderInfo(
          Gauge,
          'Aceleração',
          acceleration,
          maxVehiclePerformance.acceleration,
        )}
        {renderInfo(
          ChevronsUp,
          'Velocidade',
          speed,
          maxVehiclePerformance.speed,
        )}
        {renderInfo(Weight, 'Frenagem', braking, maxVehiclePerformance.braking)}
        {renderInfo(Fuel, 'Saúde do motor', engineHealth, 100, true)}
      </ul>
    </article>
  )
}
