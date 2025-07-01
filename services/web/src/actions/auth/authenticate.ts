'use server'

import { ActionResult } from '@/types/ActionResult'
import { ErrorMessages } from '@/constants/ErrorMessages'
import { handleActionError } from '@/utils/handleActionError'
import { redirect } from 'next/navigation'

type AuthenticationCredentials = {
    email: string
    password: string
}

export async function authenticate({ email, password }: AuthenticationCredentials): Promise<ActionResult | void> {  
  try {

      

    return {
      success: true,
      message: 'Authentication successful',
      data: null
    }
    

  } catch (error) {
    return handleActionError(error, ErrorMessages.AuthenticationFailed)
  }
}
