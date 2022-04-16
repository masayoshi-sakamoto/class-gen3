import { IApp } from '@/types/nuxt'
import refresh from '@/utils/refresh'

export default class Fetch<%= classNames %>UseCase implements BaseUseCase {
  App: IApp
  constructor(app: IApp) {
    this.App = app
  }

  async execute() {
    await refresh(this.App)
    const response = await this.App.<%= appName.toLowerCase() %>Gateway.<%= className %>.Fetch<%= classNames %>(this.App.<%= className.toLowerCase() %>.options)
    this.App.<%= className.toLowerCase() %>.save(response.items)
    this.App.<%= className.toLowerCase() %>.query = response.query
    this.App.<%= className.toLowerCase() %>.options = {
      ...this.App.<%= className.toLowerCase() %>.options,
      ...response.options
    }
  }
}
