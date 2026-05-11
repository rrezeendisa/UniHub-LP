import { Modal } from './modal'
import { Button } from '../Button/button'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: LogoutModalProps) {
  return (
    <Modal title="Sair da sessão" isOpen={isOpen} onClose={onClose}>
      <div className="mb-8 space-y-2">
        <p className="text-center font-semibold text-[var(--color-text)]">
          Deseja sair da sua conta?
        </p>
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Você será desconectado da plataforma.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button size="large" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button size='large' variant="primary" onClick={onConfirm}>
          {isLoading ? 'Saindo...' : 'Sair'}
        </Button>
      </div>
    </Modal>
  )
}
