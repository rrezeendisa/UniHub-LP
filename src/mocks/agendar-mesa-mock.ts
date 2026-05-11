export interface TableReservation {
  id: number
  name: string
  side: 'left' | 'right'
  isAvailable: boolean
}

export const generateTableMocks = (): TableReservation[] => {
  const tables: TableReservation[] = []

  for (let i = 1; i <= 11; i++) {
    tables.push({
      id: i,
      name: `Mesa ${i}`,
      side: 'left',
      isAvailable: i <= 8,
    })
  }

  for (let i = 1; i <= 11; i++) {
    tables.push({
      id: i + 100,
      name: `Mesa ${i}`,
      side: 'right',
      isAvailable: i <= 9,
    })
  }

  return tables
}

export const tablesMock = generateTableMocks()
