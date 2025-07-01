import { BaseHttpService } from './BaseHttpService'
import { 
  AuthenticationService, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '../interfaces/AuthenticationService'

export class HttpAuthenticationService extends BaseHttpService implements AuthenticationService {
  async login({ email, password }: LoginRequest): Promise<AuthResponse> {
    const response = await this.post('/auth/login', { email, password })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid credentials')
      }
      throw new Error('Login failed. Please try again.')
    }

    return response.json()
  }

  async register({ email, password }: RegisterRequest): Promise<AuthResponse> {
    const response = await this.post('/auth/register', { email, password })
    
    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('User already exists')
      }
      throw new Error('Registration failed. Please try again.')
    }

    return response.json()
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await this.post('/auth/verify', null, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      return response.ok
    } catch (error) {
      return false
    }
  }
}
