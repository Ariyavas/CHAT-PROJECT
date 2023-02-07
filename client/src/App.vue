<template>
  <RouterView />
</template>

<script>
import { ref } from 'vue'
import { RouterLink, RouterView } from "vue-router";


export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }, data() {
    return {
      title: "LOGIN"
    }
  }
}
</script>
