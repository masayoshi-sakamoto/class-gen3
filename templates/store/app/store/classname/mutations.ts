import { MutationTree } from 'vuex'
import { I<%= className %>State, state as init } from '@/store/<%= className.toLowerCase() %>'
import { Types, Store, Query, Options, Loading, Dialog, Selects } from '@/store/<%= className.toLowerCase() %>/types'

const mutations: MutationTree<I<%= className %>State> = {
  [Types.clear]: (state) => {
    Object.assign(state, init())
  },
  [Types.selects]: (state, action: Selects) => {
    state.selects = action.payload || init().selects
  },
  [Types.store]: (state, action: Store) => {
    if (action.payload) {
      action.payload.forEach((prop) => {
        if (prop.id) {
          state.byIds = {
            ...state.byIds,
            [prop.id]: prop
          }
        }
      })
    } else {
      state.byIds = init().byIds
    }
  },
  [Types.query]: (state, action: Query) => {
    state.query = action.payload
  },
  [Types.options]: (state, action: Options) => {
    state.options = action.payload
  },
  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },
  [Types.dialog]: (state, action: Dialog) => {
    state.dialog = action.payload
  }
}

export default mutations
