import { IApp } from '@/types/nuxt'
import refresh from '@/utils/refresh'

export default class Get<%= className %>UseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute(id: string) {
    await refresh(this.App)
    const response = await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Get<%= className %>(id)
    this.App.<%= className.toLowerCase() %>.save(response)
  }
}
