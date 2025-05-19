import type { IVehicle, IVehiclePerformance } from '@shared/types'
import { CarFront, Search, Warehouse } from 'lucide-react'
import { useMemo, useState } from 'react'

import { VehicleCard } from './components/vehicle-card'
import { VehicleInfo } from './components/vehicle-info'
import { useKeydown } from './hooks/useKeydown'
import { useNuiFetch } from './hooks/useNuiFetch'
import { useNuiSubscribe } from './hooks/useNuiSubcribe'
import { clsx } from './utils/clsx'

export const App = () => {
  const nuiFetch = useNuiFetch()

  const [show, setShow] = useState(false)

  const [term, setTerm] = useState('')
  const [maxVehiclePerformance, setMaxVehiclePerformance] =
    useState<IVehiclePerformance>({
      acceleration: 0,
      braking: 0,
      speed: 0,
    })
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [vehicle, setVehicle] = useState<IVehicle>()

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((veh) => {
      const searchTerm = term.toLowerCase()
      return (
        veh.modelName.toLowerCase().includes(searchTerm) ||
        veh.plate.toLowerCase().includes(searchTerm)
      )
    })
  }, [term, vehicles])

  useNuiSubscribe<boolean>('show', (state) => {
    setShow(state)
    if (state) {
      setVehicle(undefined)
    }
  })

  useNuiSubscribe<IVehicle[]>('vehicles', setVehicles)

  useNuiSubscribe<IVehiclePerformance>(
    'maxVehiclePerformance',
    setMaxVehiclePerformance,
  )

  useKeydown('Escape', () => {
    nuiFetch('close')
  })

  return (
    <main
      className={clsx(
        'flex justify-between text-white w-svw h-svh overflow-hidden',
        // show ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}>
      <aside className="w-full max-w-[35vw] h-full bg-black/80 backdrop-blur-sm p-6 flex flex-col gap-4">
        <header className="flex justify-between">
          <aside className="flex items-center gap-2">
            <div className="w-fit h-fit bg-neutral-500/20 p-2 rounded-md">
              <CarFront className="text-brand-500" />
            </div>
            <div>
              <h1 className="text-2xl text-brand-500 font-bold uppercase">
                Garagem
              </h1>
              <p className="text-sm font-semibold text-neutral-500">
                Selecione um veículo para visualizar suas informações ou spawnar
              </p>
            </div>
          </aside>
        </header>
        <article className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Selecione um veículo</h4>
          <div className="relative rounded-md bg-neutral-500/20 pl-10 pr-4 px-2">
            <div
              className={clsx(
                'absolute top-1/2 left-2 transform -translate-y-1/2',
                'flex items-center',
                'pointer-events-none',
              )}>
              <Search className="text-neutral-500" />
            </div>
            <input
              type="search"
              className={clsx(
                'appearance-none bg-transparent',
                'w-full h-10 text-neutral-500 placeholder:text-neutral-500 outline-none',
              )}
              placeholder="Pesquise por um veículo"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </article>
        <section
          className={clsx(
            'grid grid-cols-3 gap-2',
            ' h-fit max-h-full py-2 px-0.5',
            'overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}>
          {filteredVehicles.map((veh) => (
            <VehicleCard
              key={veh.plate}
              onSelect={() => {
                setVehicle(veh)
                nuiFetch('previewVehicle', veh)
              }}
              selected={vehicle?.plate === veh.plate}
              {...veh}
            />
          ))}
        </section>
        <footer
          className={clsx(
            'mt-auto transition-all',
            vehicle
              ? 'opacity-100 translate-y-0'
              : 'translate-y-4 h-0 overflow-hidden',
          )}>
          <button
            onClick={() => {
              if (vehicle) {
                nuiFetch('spawnVehicle', vehicle.plate)
              }
            }}
            className={clsx(
              'w-full rounded-md p-2',
              'font-bold bg-brand-500/85',
              'transition-all cursor-pointer',
              'hover:bg-brand-600 hover:scale-[101%]',
              'flex justify-center items-center gap-2',
            )}>
            <Warehouse className="size-4" />
            Retirar veículo
          </button>
        </footer>
      </aside>
      <aside className="flex flex-col justify-between p-8">
        <div
          className={clsx(
            'transition-transform',
            vehicle ? 'translate-x-0' : 'translate-x-10',
          )}>
          {vehicle && (
            <VehicleInfo
              vehicle={vehicle}
              maxVehiclePerformance={maxVehiclePerformance}
            />
          )}
        </div>
      </aside>
    </main>
  )
}
