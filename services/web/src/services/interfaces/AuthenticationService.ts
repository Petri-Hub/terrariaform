export type LoginRequest = {
  email: string
  password: string
}

export type AuthenticationResponse = {
  token: string
  user: {
    id: string
    email: string
  }
}

export interface AuthenticationService {
  login(request: LoginRequest): Promise<AuthenticationResponse>
}
