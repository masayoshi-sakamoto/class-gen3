import { IApp } from '@/types/nuxt'
import AccountEntity from '@/entities/Account'

export default class LoginUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: AccountEntity) {
    await console.log(entity)
  }
}
