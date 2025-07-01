'use server'

import { ActionResult } from '@/types/ActionResult'
import { ErrorMessages } from '@/constants/ErrorMessages'
import { handleActionError } from '@/utils/handleActionError'
import { AuthenticationService } from '@/services/interfaces/AuthenticationService'
import { HttpAuthenticationService } from '@/services/http/HttpAuthenticationService'
import { redirect } from 'next/navigation'

type AuthenticationCredentials = {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticationCredentials, service: AuthenticationService = new HttpAuthenticationService()): Promise<ActionResult | void> {
  try {

    await service.login({
      email,
      password
    })

    redirect('/dashboard')

  } catch (error) {
    return handleActionError(error)
  }
}
