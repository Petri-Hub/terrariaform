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

        return {
            token: "mocked-token",
            user: {
                id: "mocked-user-id",
                email: request.email,
            }
        }

    } catch(error){
        throw new AuthenticationError();
    }
  }
}
