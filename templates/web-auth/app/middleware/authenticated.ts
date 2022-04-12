import { Context } from '@nuxt/types/app'
import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ App, redirect }: Context) => {
  if (App.auth.token) {
    return
  }

  App.auth.clear()
  redirect('/login')
}

export default authenticated
