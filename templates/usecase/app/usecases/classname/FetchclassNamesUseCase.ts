import { IApp } from '@/types/nuxt'
import RefreshUseCase from '@/usecases/RefreshUseCase'

export default class Fetch<%= classNames %>UseCase extends RefreshUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    super()
    this.App = app
  }

  async execute() {
    await super.refresh(this.App)
    const response = await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Fetch<%= classNames %>(this.App.<%= className.toLowerCase() %>.options)
    this.App.<%= className.toLowerCase() %>.store(response.items)
    this.App.<%= className.toLowerCase() %>.query = response.query
    this.App.<%= className.toLowerCase() %>.options = {
      ...this.App.<%= className.toLowerCase() %>.options,
      ...response.options
    }
  }
}
