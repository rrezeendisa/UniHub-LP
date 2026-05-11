import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as v from 'valibot'
import { TextInput } from '../Input/text-input'
import { PasswordInput } from '../Input/password-input'
import { Button } from '../Button/button'
import { Radio } from '../Radio/radio'

const cadastroSchema = v.object({
  role: v.picklist(['aluno', 'professor']),
  ra: v.pipe(
    v.string(),
    v.minLength(1, 'Credenciais inválidas'),
    v.regex(/^\d+$/, 'Credenciais inválidas')
  ),
  email: v.pipe(
    v.string(),
    v.minLength(1, 'Credenciais inválidas'),
    v.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Credenciais inválidas')
  ),
  password: v.pipe(v.string(), v.minLength(5, 'Credenciais inválidas')),
  confirmPassword: v.pipe(v.string(), v.minLength(5, 'Credenciais inválidas')),
})

type CadastroFormErrors = {
  role?: string
  ra?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function CadastroForm() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'aluno' | 'professor'>('aluno')
  const [ra, setRa] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<CadastroFormErrors>({})

  const hasErrors = useMemo(
    () =>
      Boolean(
        errors.role ||
        errors.ra ||
        errors.email ||
        errors.password ||
        errors.confirmPassword
      ),
    [errors]
  )

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault()

    const result = v.safeParse(cadastroSchema, {
      role,
      ra: ra.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    })

    if (!result.success || password === null) {
      setErrors({
        role: 'Credenciais inválidas',
        ra: 'Credenciais inválidas',
        email: 'Credenciais inválidas',
        password: 'Credenciais inválidas',
        confirmPassword: 'Credenciais inválidas',
      })

      if (password !== confirmPassword) {
        setErrors({
          password: 'As senhas não coincidem',
          confirmPassword: 'As senhas não coincidem',
        })
      }
      return
    }

    setErrors({})
    navigate('/login')
  }

  const clearErrorsIfNeeded = () => {
    if (hasErrors) {
      setErrors({})
    }
  }

  return (
    <section className="w-full rounded-lg bg-[var(--color-surface)] px-6 py-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-[var(--color-primary)]">
        Cadastrar
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex justify-center gap-8">
          <Radio
            name="role"
            value="aluno"
            label="Aluno"
            checked={role === 'aluno'}
            onChange={() => {
              setRole('aluno')
              clearErrorsIfNeeded()
            }}
          />
          <Radio
            name="role"
            value="professor"
            label="Professor"
            checked={role === 'professor'}
            onChange={() => {
              setRole('professor')
              clearErrorsIfNeeded()
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="RA"
            value={ra}
            onChange={(value) => {
              setRa(value)
              clearErrorsIfNeeded()
            }}
            isObrigatorie
          />
          {errors.ra && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.ra}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="E-mail"
            value={email}
            onChange={(value) => {
              setEmail(value)
              clearErrorsIfNeeded()
            }}
            isObrigatorie
          />
          {errors.email && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Senha"
            value={password}
            onChange={(value) => {
              setPassword(value)
              clearErrorsIfNeeded()
            }}
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

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Confirmar senha"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value)
              clearErrorsIfNeeded()
            }}
          />
          {errors.confirmPassword && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="pt-2 flex justify-center">
          <Button variant="primary" size="large" onClick={() => handleSubmit()}>
            Cadastrar
          </Button>
        </div>
      </form>
    </section>
  )
}
