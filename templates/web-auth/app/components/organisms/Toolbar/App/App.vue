<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-container fluid>
      <v-row>
        <v-col cols="3" align-self="center" class="logo-lg">
          <nuxt-link to="/"><%= appName %></nuxt-link>
        </v-col>
        <v-col cols="6">
          <v-tabs centered>
            <v-tab v-for="menu in menus" :key="menu.id">{{ menu.title }}</v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="3" align-self="center" class="text-right">
          <v-btn text to="/login">ログイン</v-btn>
          <v-btn min-width="100" rounded color="primary" to="/signup">登録</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { menus } from '@/entities/Menu'

export default Vue.extend({
  data() {
    return {
      menus
    }
  }
})
</script>
