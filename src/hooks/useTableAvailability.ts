import { useState, useEffect, useCallback } from 'react'
import type { TableReservation } from '../mocks/agendar-mesa-mock'
import { tablesMock } from '../mocks/agendar-mesa-mock'
import { loadPersistedReservations } from '../utils/persistence'

export function useTableAvailability() {
  const computeTablesWithPersistence = useCallback(() => {
    try {
      const persisted = loadPersistedReservations()
      const reservedNames = new Set(
        persisted.filter((r) => r.type === 'mesa').map((r) => r.reservationName)
      )

      return tablesMock.map((t) => ({
        ...t,
        isAvailable: Boolean(t.isAvailable && !reservedNames.has(t.name)),
      }))
    } catch {
      return tablesMock
    }
  }, [])

  const [tables, setTables] = useState<TableReservation[]>(() =>
    computeTablesWithPersistence()
  )

  useEffect(() => {
    const handler = () => setTables(computeTablesWithPersistence())

    window.addEventListener('meus-agendamentos:changed', handler)

    const storageHandler = (e: StorageEvent) => {
      if (e.key === 'meus_agendamentos_v1') {
        setTables(computeTablesWithPersistence())
      }
    }

    window.addEventListener('storage', storageHandler)

    return () => {
      window.removeEventListener('meus-agendamentos:changed', handler)
      window.removeEventListener('storage', storageHandler)
    }
  }, [computeTablesWithPersistence])

  return {
    tables,
    refreshTables: () => setTables(computeTablesWithPersistence()),
  }
}
