import { IApp } from '@/types/nuxt'
import RefreshUseCase from '@/usecases/RefreshUseCase'

export default class Get<%= className %>UseCase extends RefreshUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    super()
    this.App = app
  }

  async execute(id: string) {
    await super.refresh(this.App)
    const response = await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Get<%= className %>(id)
    this.App.<%= className.toLowerCase() %>.store(response)
  }
}
