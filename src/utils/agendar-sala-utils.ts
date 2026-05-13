
import type { RoomReservation } from '../mocks/agendar-sala-mock'

export const getRoomsByBuilding = (
  rooms: RoomReservation[],
  building: RoomReservation['building']
): RoomReservation[] => {
  return rooms.filter((room) => room.building === building)
}

export const sortRoomsByClassName = (
  rooms: RoomReservation[]
): RoomReservation[] => {
  return [...rooms].sort((firstRoom, secondRoom) =>
    firstRoom.className.localeCompare(secondRoom.className, 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    })
  )
}
