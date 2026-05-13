import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALink } from '../../components/ALink/a-link'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { CadastroForm } from '../../components/CadastroForm/cadastro-form'
import LogoLogin from '../../assets/logo-login.svg'

export function CadastroPage() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando cadastro..." />
  }

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
