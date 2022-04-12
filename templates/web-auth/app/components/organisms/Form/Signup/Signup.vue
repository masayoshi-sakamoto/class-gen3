<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <v-form>
      <validation-provider v-slot="{ errors }" name="メールアドレス" rules="required|email">
        <v-text-field v-model="props.username" label="メールアドレス" outlined :error-messages="errors"></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="パスワード" rules="required|min:8">
        <v-text-field
          v-model="props.password"
          label="パスワード"
          outlined
          counter
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :error-messages="errors"
          @click:append="show = !show"
        ></v-text-field>
      </validation-provider>
      <v-btn block depressed x-large type="submit" :disabled="invalid" color="primary">同意して登録する</v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AccountEntity, { EmptyAccountPropsFactory, IAccountProps } from '@/entities/Account'

interface IData {
  show: boolean
  props: IAccountProps
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<AccountEntity>,
      required: true
    }
  },
  data(): IData {
    return {
      show: false,
      props: EmptyAccountPropsFactory()
    }
  },
  watch: {
    value: {
      handler() {
        this.props = this.value.clone.props
      },
      immediate: true
    }
  },
  methods: {
    submit() {
      this.$emit('input', new AccountEntity(this.props))
      this.$emit('submit')
    },
    cancel() {
      const refs: any = this.$refs
      refs.observer.reset()
    }
  }
})
</script>
