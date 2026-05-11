import { useNavigate } from 'react-router-dom'
import { ALink } from '../../components/ALink/a-link'
import { CadastroForm } from '../../components/CadastroForm/cadastro-form'
import LogoLogin from '../../assets/logo-login.svg'

export function CadastroPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen px-[32px] grid gap-8 lg:grid-cols-2">
      <section className="flex flex-col items-center justify-center text-center">
        <img
          src={LogoLogin}
          alt="UniHub"
          className="w-full max-w-[340px] object-contain"
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-base text-[var(--color-text)]">
            Já tem uma conta?
          </p>
          <ALink
            href="/login"
            onClick={(event) => {
              event.preventDefault()
              navigate('/login')
            }}
          >
            Entrar!
          </ALink>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <CadastroForm />
      </section>
    </div>
  )
}
