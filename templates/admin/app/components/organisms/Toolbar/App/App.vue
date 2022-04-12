<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-container>
      <v-row>
        <v-col align-self="center text-h5"><%= appName %></v-col>
        <v-col>
          <v-tabs centered>
            <v-tab v-for="menu in menus" :key="menu.id">{{ menu.title }}</v-tab>
          </v-tabs>
        </v-col>
        <v-col></v-col>
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
