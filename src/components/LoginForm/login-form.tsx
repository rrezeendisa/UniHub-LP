import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as v from 'valibot'
import { TextInput } from '../Input/text-input'
import { PasswordInput } from '../Input/password-input'
import { Button } from '../Button/button'

const loginSchema = v.object({
  identifier: v.pipe(v.string(), v.minLength(3, 'Credenciais inválidas')),
  password: v.pipe(v.string(), v.minLength(5, 'Credenciais inválidas')),
})

type LoginFormErrors = {
  identifier?: string
  password?: string
}

export function LoginForm() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})

  const hasErrors = useMemo(
    () => Boolean(errors.identifier || errors.password),
    [errors]
  )

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault()

    const result = v.safeParse(loginSchema, {
      identifier: identifier.trim(),
      password: password.trim(),
    })

    if (!result.success) {
      setErrors({
        identifier: 'Credenciais inválidas',
        password: 'Credenciais inválidas',
      })
      return
    }

    setErrors({})
    navigate('/agendar-mesa')
  }

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value)
    if (hasErrors) {
      setErrors({})
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (hasErrors) {
      setErrors({})
    }
  }

  return (
    <section className="w-full rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-4 py-6 shadow-sm sm:px-6 sm:py-8 lg:px-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-2">
          <TextInput
            label="RA ou E-mail"
            value={identifier}
            onChange={handleIdentifierChange}
            isObrigatorie
          />
          {errors.identifier && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.identifier}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Senha"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <Button variant="primary" size="large" type="submit">
          Entrar
        </Button>
      </form>
    </section>
  )
}
