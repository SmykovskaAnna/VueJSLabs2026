<script setup>
import { provide, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AdModal from './components/AdModal.vue'

const route = useRoute()
const theme = ref(localStorage.getItem('visnyk-theme') || 'light')
const showAd = ref(false)

watch(theme, (value) => {
  document.documentElement.dataset.theme = value
  localStorage.setItem('visnyk-theme', value)
}, { immediate: true })

provide('themeControls', {
  theme,
  toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  },
})
</script>

<template>
  <div class="site-shell">
    <AppHeader />
    <main class="page-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" @open-ad="showAd = true" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <AdModal v-model="showAd" />
  </div>
</template>

<style>
.page-enter-active, .page-leave-active { transition: opacity .22s ease, transform .22s ease; }
.page-enter-from { opacity: 0; transform: translateY(10px); }
.page-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
