import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useState } from 'react'
import { getCurrentPosition } from '../utils/geolocation'
import { Map } from '../utils/map'

export function useMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState<Map>()

  useEffect(() => {
    ;(async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDmQ_p7HtIwTNBGb_oZh3AC9i1CfB_DMdc',
        // apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
        libraries: ['routes', 'geometry'],
      })
      const [, , position] = await Promise.all([
        loader.importLibrary('routes'),
        loader.importLibrary('geometry'),
        getCurrentPosition({ enableHighAccuracy: true }),
      ])
      const map = new Map(containerRef.current!, {
        zoom: 15,
        center: position,
      })
      setMap(map)
    })()
  }, [containerRef])

  return map
}
