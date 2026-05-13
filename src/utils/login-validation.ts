import * as v from 'valibot'

export type LoginFormErrors = {
  identifier?: string
  password?: string
}

const loginSchema = v.object({
  identifier: v.pipe(
    v.string('Credenciais inválidas'),
    v.minLength(3, 'Credenciais inválidas')
  ),
  password: v.pipe(
    v.string('Credenciais inválidas'),
    v.minLength(5, 'Credenciais inválidas')
  ),
})

export function validateLoginForm(values: {
  identifier: string
  password: string
}): LoginFormErrors {
  const result = v.safeParse(loginSchema, {
    identifier: values.identifier.trim(),
    password: values.password.trim(),
  })

  if (result.success) {
    return {}
  }

  const errors: LoginFormErrors = {}

  for (const issue of result.issues) {
    const pathKey = issue.path?.[0]?.key

    if (pathKey === 'identifier' || pathKey === 'password') {
      errors[pathKey] = issue.message
    }
  }

  return errors
}
