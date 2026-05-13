import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  validateCadastroForm,
  type CadastroFormErrors,
} from '../utils/cadastro-validation'

export function useCadastroForm() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'aluno' | 'professor'>('aluno')
  const [ra, setRa] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<CadastroFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const updateField = (
    field: 'ra' | 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'ra') setRa(value)
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)
    if (field === 'confirmPassword') setConfirmPassword(value)

    if (hasErrors) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const submit = async () => {
    const nextErrors = validateCadastroForm({
      role,
      ra,
      email,
      password,
      confirmPassword,
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return false
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setErrors({})
      navigate('/login')
      return true
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    role,
    setRole,
    ra,
    email,
    password,
    confirmPassword,
    errors,
    isSubmitting,
    updateField,
    submit,
    clearErrors: () => setErrors({}),
  }
}
