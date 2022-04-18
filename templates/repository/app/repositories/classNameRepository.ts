import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/<%= className.toLowerCase() %>/types'
import { IOptionsProps } from '@/entities/Options'
import <%= className %>Entity, { Empty<%= className %>EntityFactory, I<%= className %>Props } from '@/entities/<%= className %>'
import { IQueryProps } from '@/entities/Query'

export default class <%= className %>Repository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  set loading(value: boolean) {
    this.store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this.store.state.<%= className.toLowerCase() %>.loading
  }

  set dialog(value: boolean | null) {
    this.store.commit(new types.Dialog(value))
  }

  get dialog(): boolean | null {
    return this.store.state.<%= className.toLowerCase() %>.dialog
  }

  set query(value: IQueryProps) {
    this.store.commit(new types.Query(value))
  }

  get query(): IQueryProps {
    return this.store.state.<%= className.toLowerCase() %>.query
  }

  set options(value: IOptionsProps) {
    this.store.commit(new types.Options(value))
  }

  get options(): IOptionsProps {
    return this.store.state.<%= className.toLowerCase() %>.options
  }

  save(value: I<%= className %>Props[] | I<%= className %>Props, reset: boolean = true) {
    if (reset) {
      this.store.commit(new types.Store(null))
    }
    value = !Array.isArray(value) ? [value] : value
    this.store.commit(new types.Store(value))
  }

  all(): <%= className %>Entity[] {
    const props = this.store.state.<%= className.toLowerCase() %>.byIds
    return props ? Object.values(props).map((prop) => Empty<%= className %>EntityFactory(prop)) : []
  }

  get(id: string): <%= className %>Entity {
    return Empty<%= className %>EntityFactory(this.store.state.<%= className.toLowerCase() %>.byIds[id])
  }

  items(value: I<%= className %>Props[]) {
    this.store.commit(new types.Selects(null))
    this.store.commit(new types.Selects(value))
  }

  selects(empty?: string): { text: any; value: any }[] {
    const values: { text: any; value: any }[] = empty ? [{ text: empty, value: null }] : []
    return values.concat(
      this.store.state.template.selects.map((prop) => {
        const entity = Empty<%= className %>EntityFactory(prop)
        return { text: entity.title, value: entity.id }
      })
    )
  }
  clear() {
    this.store.commit(new types.Clear())
  }
}
