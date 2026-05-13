import { useState, useEffect, useCallback } from 'react'
import { roomsMock, type RoomReservation } from '../mocks/agendar-sala-mock'
import { loadPersistedReservations } from '../utils/persistence'

interface ComputedRoom {
  room: RoomReservation
  isAvailable: boolean
}

export function useRoomAvailability() {
  const computeRoomsWithPersistence = useCallback((): ComputedRoom[] => {
    try {
      const persisted = loadPersistedReservations()
      const reservedNames = new Set(
        persisted.filter((r) => r.type === 'sala').map((r) => r.reservationName)
      )
      return roomsMock.map((room) => ({
        room,
        isAvailable: !reservedNames.has(room.className),
      }))
    } catch {
      return roomsMock.map((room) => ({ room, isAvailable: true }))
    }
  }, [])

  const [computedRooms, setComputedRooms] = useState<ComputedRoom[]>(() =>
    computeRoomsWithPersistence()
  )

  useEffect(() => {
    const handler = () => setComputedRooms(computeRoomsWithPersistence())
    window.addEventListener('meus-agendamentos:changed', handler)

    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'meus_agendamentos_v1') {
        setComputedRooms(computeRoomsWithPersistence())
      }
    }
    window.addEventListener('storage', storageHandler)

    return () => {
      window.removeEventListener('meus-agendamentos:changed', handler)
      window.removeEventListener('storage', storageHandler)
    }
  }, [computeRoomsWithPersistence])

  const getAvailabilityMap = (): Map<string, boolean> => {
    const map = new Map<string, boolean>()
    computedRooms.forEach(({ room, isAvailable }) => {
      map.set(room.className, isAvailable)
    })
    return map
  }

  return {
    computedRooms,
    refreshRooms: () => setComputedRooms(computeRoomsWithPersistence()),
    getAvailabilityMap,
  }
}
