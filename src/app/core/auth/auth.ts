import { Service } from '@angular/core';
import { of } from 'rxjs';

@Service()
export class Auth {

  private token = 'mock-access-u1';

  // -- public API --

  public getToken() {
    return this.token;
  }

  public getHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }

  refreshToken(){
    // TODO:
    console.log('Refresh token');
    
    return of(true)
  }
}
