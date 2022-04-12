<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-container fluid>
      <v-row>
        <v-col align-self="center" class="logo-lg">
          <nuxt-link to="/">Bambooo</nuxt-link>
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
