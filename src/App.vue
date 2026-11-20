<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStore } from './stores/settings'
import { useCartStore } from './stores/cart'

import Catalog from './pages/Catalog.vue'
import Cart from './pages/Cart.vue'
import Profile from './pages/Profile.vue'

const { t, locale } = useI18n()

const settings = useSettingsStore()
const cart = useCartStore()

const currentPage = ref('catalog')

watch(
  () => settings.locale,
  (lang) => {
    locale.value = lang
  },
  { immediate: true }
)

function changeLanguage(lang) {
  settings.setLocale(lang)
}
</script>

<template>
<div class="app">
    <header class="header">
      <div class="header-content">
        <div class="logo" @click="currentPage = 'catalog'">
          HERO<span>BOX</span>
          <small>COLLECT YOUR HEROES</small>
        </div>

        <nav class="navigation">
          <button
            :class="{ active: currentPage === 'catalog' }"
            @click="currentPage = 'catalog'"
          >
            {{ t('app.catalog') }}
          </button>

          <button
            :class="{ active: currentPage === 'cart' }"
            @click="currentPage = 'cart'"
          >
            {{ t('app.cart') }}
            <span class="cart-count">{{ cart.totalCount }}</span>
          </button>

          <button
            :class="{ active: currentPage === 'profile' }"
            @click="currentPage = 'profile'"
          >
            {{ t('app.profile') }}
          </button>
        </nav>

        <div class="language-switch">
          <button
            :class="{ selected: locale === 'ua' }"
            @click="changeLanguage('ua')"
          >
            UA
          </button>

          <span>|</span>

          <button
            :class="{ selected: locale === 'en' }"
            @click="changeLanguage('en')"
          >
            EN
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="hero-banner">
        <div>
          <span class="hero-label">YOUR COLLECTION STARTS HERE</span>
          <h1>Улюблені персонажі.<span>Твоя колекція.</span></h1>
          <p>Відкрий світ культових героїв кіно, серіалів та мультфільмів.</p>
        </div>
      </div>

      <Catalog v-if="currentPage === 'catalog'" />
      <Cart v-else-if="currentPage === 'cart'" />
      <Profile v-else-if="currentPage === 'profile'" />
    </main>

    <footer class="footer">
      <strong>HEROBOX</strong>
      <p>© 2026 HEROBOX. Collect your favorite heroes.</p>
    </footer>
  </div>
</template>
