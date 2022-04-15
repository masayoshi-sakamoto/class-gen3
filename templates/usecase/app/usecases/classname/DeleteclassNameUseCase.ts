import { IApp } from '@/types/nuxt'
import <%= className %>Entity from '@/entities/<%= className %>'
import RefreshUseCase from '@/usecases/RefreshUseCase'

export default class Delete<%= className %>UseCase extends RefreshUseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    super()
    this.App = app
  }

  async execute(entity: <%= className %>Entity) {
    await super.refresh(this.App)
    await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Delete<%= className %>(entity)
  }
}
