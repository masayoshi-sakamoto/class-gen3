import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/<%= className.toLowerCase() %>/types'
import { IOptionsProps } from '@/entities/Options'
import <%= className %>Entity, { Empty<%= className %>EntityFactory, I<%= className %>Props } from '@/entities/<%= className %>'
import { IQueryProps } from '@/entities/Query'

export default class <%= className %>Repository {
  private cookies: NuxtCookies
  private _store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this._store = store
  }

  set loading(value: boolean) {
    this._store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this._store.state.<%= className.toLowerCase() %>.loading
  }

  set dialog(value: boolean | null) {
    this._store.commit(new types.Dialog(value))
  }

  get dialog(): boolean | null {
    return this._store.state.<%= className.toLowerCase() %>.dialog
  }

  set query(value: IQueryProps) {
    this._store.commit(new types.Query(value))
  }

  get query(): IQueryProps {
    return this._store.state.<%= className.toLowerCase() %>.query
  }

  set options(value: IOptionsProps) {
    this._store.commit(new types.Options(value))
  }

  get options(): IOptionsProps {
    return this._store.state.<%= className.toLowerCase() %>.options
  }

  store(value: I<%= className %>Props[] | I<%= className %>Props, reset: boolean = true) {
    if (reset) {
      this._store.commit(new types.Store(null))
    }
    value = !Array.isArray(value) ? [value] : value
    this._store.commit(new types.Store(value))
  }

  all(): <%= className %>Entity[] {
    const props = this._store.state.<%= className.toLowerCase() %>.byIds
    return props ? Object.values(props).map((prop) => Empty<%= className %>EntityFactory(prop)) : []
  }

  get(id: string): <%= className %>Entity {
    return Empty<%= className %>EntityFactory(this._store.state.<%= className.toLowerCase() %>.byIds[id])
  }

  clear() {
    this._store.commit(new types.Clear())
  }
}
