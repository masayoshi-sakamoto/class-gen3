<template>
  <LayoutAuth :title="title">
    <v-container fluid>
      <v-row justify="center" class="pa-2">
        <v-card max-width="480" width="100%" class="pa-1">
          <v-card-text v-if="error.statusCode !== 403" class="text-center">
            <div class="logo-lg mb-2">{{ error.statusCode }}</div>
            <div class="mb-4">{{ error.message }}</div>
            <div>{{ error.statusCode === 404 ? pageNotFound : otherError }}</div>
            <div class="mt-10">
              <nuxt-link :to="localePath('/')">トップページに戻る</nuxt-link>
            </div>
          </v-card-text>
          <v-card-text v-else class="text-center">
            <template v-if="step === 1">
              <div class="text-h5 mb-4">アクセス権が必要です</div>
              <div class="mb-8">アクセス権をリクエストするか、<br />アクセス権のあるアカウントに切り替えてください。</div>
              <v-btn depressed color="primary" @click="request">アクセス権をリクエスト</v-btn>
            </template>
            <template v-if="step === 2">
              <div class="text-h5 mb-4">リクエストを送信しました</div>
              <div class="mb-8">リクエストが許可された場合はメールが届きます。</div>
            </template>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </LayoutAuth>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAuth from '@/components/organisms/Layout/Auth'
import SaveRequestUseCase from '@/usecases/request/SaveRequestUseCase'
import { EmptyRequestEntityFactory } from '@/entities/Request'

export default Vue.extend({
  components: {
    LayoutAuth
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    let title = 'サーバーエラー'
    if (this.error.statusCode === 404) {
      title = 'お探しのページは見つかりません'
    } else if (this.error.statusCode === 403) {
      title = 'アクセスが拒否されました'
    }

    return {
      pageNotFound: 'お探しのページは見つかりません',
      otherError: 'サーバーエラー',
      title,
      step: 1
    }
  },
  watch: {
    error: {
      handler() {
        if (this.error.statusCode === 401) {
          this.App.state.clear()
          this.$router.push(this.localePath('/login'))
        }
      },
      immediate: true
    }
  },
  methods: {
    async request() {
      try {
        this.App.state.loading = true
        await new SaveRequestUseCase(this.App).execute(
          EmptyRequestEntityFactory({
            videoId: this.$route.params.id
          })
        )
      } catch (exception: any) {
        this.$nuxt.error(exception)
      } finally {
        this.App.state.loading = false
        this.step = 2
      }
    }
  }
})
</script>
