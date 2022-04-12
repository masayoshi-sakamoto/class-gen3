import { IApp } from '@/types/nuxt'

export default class RefreshUseCase {
  public async refresh(app: IApp) {
    const now = new Date().getTime()
    if (app.auth.expired && app.auth.expired < now) {
      app.auth.auth = await app.<%= appName.toLowerCase() %>Gateway.Auth.Refresh()
    }
  }
}
