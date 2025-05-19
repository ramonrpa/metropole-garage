import type { IVehicle } from '@shared/types'
import { Car, Fuel } from 'lucide-react'
import type React from 'react'

import platePng from '../assets/images/plate.png?url'
import { clsx } from '../utils/clsx'

interface Props extends IVehicle {
  selected: boolean
  onSelect: () => void
}

export const VehicleCard: React.FC<Props> = ({
  model,
  modelName,
  vehicleClass,
  plate,
  fuel,
  bodyHealth,
  selected,
  onSelect,
}) => {
  const renderInfo = (
    Icon: React.ElementType,
    label: string,
    value: string,
  ) => {
    return (
      <li className="flex justify-between bg-neutral-600/20 px-3.5 py-1">
        <p className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
          <Icon className="text-neutral-500 size-4" />
          {label}
        </p>
        <p className="text-xs font-bold text-brand-500">{value}</p>
      </li>
    )
  }

  return (
    <article
      onClick={onSelect}
      className={clsx(
        'flex flex-col gap-2 rounded-lg cursor-pointer',
        'border border-transparent',
        'hover:bg-neutral-400/30 hover:scale-[101%]',
        selected
          ? 'border-brand-500/40 bg-neutral-400/30 scale-[101%]'
          : 'bg-neutral-600/30',
        'transition-all h-fit',
      )}>
      <div className="flex flex-col p-4">
        <h2 className="text-lg text-brand-500 leading-3">{modelName}</h2>
        <p className="text-neutral-500">{vehicleClass}</p>
      </div>
      <div className="relative h-20 mb-6 mx-4">
        <img
          src={`https://docs.fivem.net/vehicles/${model}.webp`}
          alt="car"
          className="max-w-full max-h-full mx-auto"
        />
        <div className="absolute aspect-video w-2/4 px-1 -bottom-4 right-0">
          <p className="relative text-center text-sm z-10 text-blue-700 mt-3">
            {plate}
          </p>
          <img
            src={platePng}
            alt="plate"
            className="w-full absolute inset-0 z-0"
          />
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {renderInfo(Fuel, 'Combustivel', `${fuel}%`)}
        {renderInfo(Car, 'Carroceria', `${bodyHealth}%`)}
      </ul>
    </article>
  )
}
