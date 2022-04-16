import { IApp } from '@/types/nuxt'
import <%= className %>Entity from '@/entities/<%= className %>'
import refresh from '@/utils/refresh'

export default class Save<%= className %>UseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute(entity: <%= className %>Entity) {
    await refresh(this.App)
    await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Save<%= className %>(entity)
  }
}
