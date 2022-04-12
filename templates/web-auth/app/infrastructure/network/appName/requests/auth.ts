import { <%= appName %>, Account } from '@/infrastructure/network/<%= appName %>/schema'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { HTTPMethod } from '@/infrastructure/network/types'

export class Signup implements APIRequest<<%= appName %>.Auth.authSignupResponse> {
  response: <%= appName %>.Auth.authSignupResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authSignupRequest
  constructor(params: Account) {
    this.params = params
    this.path = '/signup'
  }
}

export class Login implements APIRequest<<%= appName %>.Auth.authSignupResponse> {
  response: <%= appName %>.Auth.authSignupResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authSignupRequest
  constructor(params: Account) {
    this.params = params
    this.path = '/login'
  }
}
