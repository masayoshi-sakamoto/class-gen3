import { <%= appName %>GatewayBase } from './base'
import { toAccountSeed } from './translator/account'
import { toAuthProps } from './translator/auth'
import { Login, Signup } from '@/infrastructure/network/<%= appName %>/requests/auth'
import AccountEntity from '@/entities/Account'

export default class Auth extends <%= appName %>GatewayBase {
  async Signup(entity: AccountEntity) {
    const { auth } = await this.apiClient.request(new Signup(toAccountSeed(entity.props)))
    return toAuthProps(auth)
  }

  async Login(entity: AccountEntity) {
    const { auth } = await this.apiClient.request(new Login(toAccountSeed(entity.props)))
    return toAuthProps(auth)
  }
}
