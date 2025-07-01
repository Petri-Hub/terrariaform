import { HttpService } from './HttpService'
import { 
  AuthenticationService, 
  LoginRequest,
  AuthenticationResponse 
} from '../interfaces/AuthenticationService'
import { AuthenticationError } from '@/errors/AuthenticationError'

export class HttpAuthenticationService extends HttpService implements AuthenticationService {
  public async login(request: LoginRequest): Promise<AuthenticationResponse> {
    try{

        const { data } = await this.post<AuthenticationResponse, LoginRequest>(
            '/auth/login', 
            request
        )

        return data

    } catch(error){
        throw new AuthenticationError();
    }
  }
}
