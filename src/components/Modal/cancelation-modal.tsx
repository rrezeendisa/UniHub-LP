import { Modal } from './modal'
import { Button } from '../Button/button'

interface CancelationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function CancelationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: CancelationModalProps) {
  return (
    <Modal title="Cancelar agendamento" isOpen={isOpen} onClose={onClose}>
      <div className="mb-8 space-y-2">
        <p className="text-center font-semibold text-[var(--color-text)]">
          Tem certeza que deseja cancelar este agendamento?
        </p>
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Esta ação liberará o horário para outros usuários.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Não
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
        >
          {isLoading ? 'Cancelando...' : 'Sim'}
        </Button>
      </div>
    </Modal>
  )
}
