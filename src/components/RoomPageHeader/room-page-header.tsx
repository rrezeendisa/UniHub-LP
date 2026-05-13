import { Badge } from '../Badge/badge'

export function RoomPageHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="flex-col gap-4">
        <div className="mb-4">
          <Badge>Reserva de sala</Badge>
        </div>

        <div className="space-y-3">
          <p className="text-[20px] leading-8 text-[var(--color-text)] sm:text-[22px]">
            <strong>
              Reserve uma sala para aulas, estudos, reuniões ou mentorias.
            </strong>
          </p>
          <p className="text-[20px] leading-8 text-[var(--color-text)] sm:text-[22px]">
            Por enquanto, o sistema permite o agendamento apenas para salas
            localizadas no <strong>prédio L</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
