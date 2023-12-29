'use client'

import { useRef } from 'react'
import { useMap } from '../hooks/useMap'

export default function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  return (
    <div className="flex flex-row h-full">
      <div>
        <h1>nova rota</h1>
        <form action="">
          <input type="text" name="souce_place" placeholder="origem" />
          <input type="text" name="destination_place" placeholder="destino" />
          <button type="submit">Pesquisar</button>
        </form>
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef}></div>
    </div>
  )
}
