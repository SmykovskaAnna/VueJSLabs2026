<script setup>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { formatHeaderDate } from '../utils/currentDate'

const { theme, toggleTheme } = inject('themeControls')
const headerDate = formatHeaderDate()
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="brand" to="/" aria-label="Вісник — на головну">
        <span class="brand-copy"><strong>Вісник</strong><small>НОВИНИ ТА ІДЕЇ</small></span>
      </RouterLink>
      <nav class="main-nav" aria-label="Головна навігація">
        <RouterLink to="/" exact-active-class="is-active">Новини</RouterLink>
        <RouterLink to="/about">Про нас</RouterLink>
      </nav>
      <div class="header-tools">
        <span class="header-edition">{{ headerDate }}</span>
      <button class="theme-toggle" type="button" :aria-label="theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'" @click="toggleTheme">
        <span aria-hidden="true">{{ theme === 'light' ? '☾' : '☀' }}</span>
        <span class="theme-label">{{ theme === 'light' ? 'Темна' : 'Світла' }}</span>
      </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header { position: relative; z-index: 2; border-bottom: 1px solid var(--line); background: var(--surface); }
.header-inner { display: grid; width: min(1560px, calc(100% - 64px)); min-height: 86px; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 32px; margin: auto; }
.brand { display: inline-flex; width: max-content; align-items: center; gap: 11px; color: var(--ink); text-decoration: none; }
.brand-copy { display: grid; gap: 2px; }
.brand-copy strong { font-family: var(--serif); font-size: 24px; font-weight: 700; letter-spacing: -.05em; line-height: 1; }
.brand-copy strong span { color: var(--accent); }
.brand-copy small { color: var(--muted); font-size: 8px; font-weight: 700; letter-spacing: .16em; }
.main-nav { display: flex; align-items: center; gap: 6px; padding: 5px; border: 1px solid var(--line); border-radius: 999px; background: var(--soft); }
.main-nav a { display: inline-flex; min-height: 38px; align-items: center; padding: 0 18px; border-radius: 999px; color: var(--muted); font-size: 13px; text-decoration: none; transition: color .2s ease, background .2s ease, box-shadow .2s ease; }
.main-nav a:hover { color: var(--ink); }
.main-nav a.is-active { color: var(--ink); background: var(--surface); box-shadow: 0 1px 4px rgba(20, 30, 20, .08); }
.header-tools { display: flex; align-items: center; justify-self: end; gap: 20px; }
.header-edition { color: var(--muted); font-size: 9px; font-weight: 700; letter-spacing: .12em; white-space: nowrap; }
.theme-toggle { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; padding: 0 14px; border: 1px solid var(--line); border-radius: 999px; color: var(--ink); background: transparent; font-size: 12px; transition: border-color .2s ease, background .2s ease; }
.theme-toggle:hover { border-color: var(--accent); background: var(--soft); }
.theme-toggle span:first-child { color: var(--accent); font-size: 16px; }
@media (max-width: 760px) { .header-inner { width: calc(100% - 36px); gap: 18px; } .header-tools { gap: 10px; } .header-edition { display: none; } }
@media (max-width: 600px) { .header-inner { min-height: 74px; grid-template-columns: 1fr auto; gap: 12px; } .main-nav { grid-column: 1 / -1; grid-row: 2; justify-self: center; margin: 0 0 12px; } .header-tools { grid-column: 2; grid-row: 1; } .site-header { padding-bottom: 0; } }
@media (max-width: 420px) { .header-inner { width: calc(100% - 28px); } .brand-copy strong { font-size: 21px; } .main-nav a { min-height: 34px; padding: 0 14px; font-size: 12px; } .theme-toggle { min-height: 36px; padding: 0 10px; } .theme-label { display: none; } }
</style>
