import { I<%= className %>Props } from '@/entities/<%= className %>'
import { IOptionsProps } from '@/entities/Options'
import { EmptyQueryPropsFactory, IQueryProps } from '@/entities/Query'

export interface I<%= className %>State {
  byIds: {
    [id: string]: I<%= className %>Props
  }
  selects: I<%= className %>Props[]
  query: IQueryProps
  options: IOptionsProps
  loading: boolean
  dialog: boolean | null
}

export const state = (): I<%= className %>State => ({
  byIds: {},
  selects: [],
  query: EmptyQueryPropsFactory(),
  options: {},
  loading: false,
  dialog: null
})

export default state
