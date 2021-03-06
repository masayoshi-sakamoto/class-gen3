import Vuex from 'vuex'
<%_ storeFiles.forEach((file) => {
  const store = file.split('.')[0]
  const Store = store.charAt(0).toUpperCase() + store.slice(1)
  if (store !== 'index' && store !== 'README') {
_%>
import * as <%= store %> from '@/store/<%= store %>'
<%_ }}); _%>

export interface RootState {
  <%_ storeFiles.forEach((file) => {
    const store = file.split('.')[0]
    const Store = store.charAt(0).toUpperCase() + store.slice(1)
    if (store !== 'index' && store !== 'README') {
  _%>
  <%= store %>: <%= store %>.I<%= Store %>State
  <%_ }}); _%>
}

const createStore = () => {
  return new Vuex.Store<RootState>({
    modules: {
      <%_ storeFiles.forEach((file) => {
        const store = file.split('.')[0]
        const Store = store.charAt(0).toUpperCase() + store.slice(1)
        if (store !== 'index' && store !== 'app' && store !== 'README') {
      _%>
      <%= store %>: <%= store %>.store,
      <%_ }}); _%>
      app: app.store
    }
  })
}

export default createStore
