<script setup>
import { RouterView } from 'vue-router'
import 'animate.css'
</script>

<template>
  <div class="flex min-h-screen text-gray-100">

    <!-- <AdminNavigation v-if="Component && hideNav" /> -->
    <!-- <transition :name="route.meta.transition" mode="out-in"> -->
    <!-- </transition> -->
  <RouterView v-slot="{ Component, route }">
    <component :is="Component" :key="$route.fullPath"></component>
  </RouterView>
  </div>
</template>

<style>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter, .fade-enter-from {
  opacity: 0;
} */
</style>

<script>
export default {
  name: "App",
  methods: {
    hideNav() {
      return !this.$route.meta.hideHeader;
    }
  },
}
</script>