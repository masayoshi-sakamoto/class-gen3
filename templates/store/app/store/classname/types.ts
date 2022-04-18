import { I<%= className %>Props } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'
import { IQueryProps } from '@/entities/Query'

export const Types = {
  clear: 'clear',
  store: 'store',
  selects: 'selects',
  query: 'query',
  options: 'options',
  loading: 'loading',
  dialog: 'dialog'
}

export const path = '<%= className.toLowerCase() %>/'

export class Clear implements FluxStandardAction<void> {
  type = path + Types.clear
  constructor() {}
}

export class Store implements FluxStandardAction<I<%= className %>Props[] | null> {
  type = path + Types.store
  constructor(public payload: I<%= className %>Props[] | null) {}
}

export class Selects implements FluxStandardAction<I <%= className %>Props[] | null> {
  type = path + Types.selects
  constructor(public payload: I <%= className %>Props[] | null) {}
}

export class Query implements FluxStandardAction<IQueryProps> {
  type = path + Types.query
  constructor(public payload: IQueryProps) {}
}

export class Options implements FluxStandardAction<IOptionsProps> {
  type = path + Types.options
  constructor(public payload: IOptionsProps) {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Dialog implements FluxStandardAction<boolean | null> {
  type = path + Types.dialog
  constructor(public payload: boolean | null) {}
}
