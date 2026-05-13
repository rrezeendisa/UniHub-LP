import { RoomCard } from '../RoomCard/room-card'
import {
  getRoomsByBuilding,
  sortRoomsByClassName,
} from '../../utils/agendar-sala-utils'
import type { RoomReservation } from '../../mocks/agendar-sala-mock'

interface RoomsGridProps {
  rooms: RoomReservation[]
  availabilityMap: Map<string, boolean>
  onRoomSelect: (roomName: string) => void
}

export function RoomsGrid({
  rooms,
  availabilityMap,
  onRoomSelect,
}: RoomsGridProps) {
  const filteredRooms = sortRoomsByClassName(getRoomsByBuilding(rooms, 'L'))

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {filteredRooms.map((room) => (
        <RoomCard
          key={room.id}
          className={room.className}
          resources={room.resources}
          places={room.places}
          isAvailable={availabilityMap.get(room.className) ?? true}
          onSelect={() => onRoomSelect(room.className)}
        />
      ))}
    </div>
  )
}
