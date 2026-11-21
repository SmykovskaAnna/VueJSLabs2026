<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <RouterLink class="footer-brand" to="/">Вісник</RouterLink>
      <nav aria-label="Навігація у футері">
        <RouterLink to="/">Новини</RouterLink>
        <RouterLink to="/about">Про нас</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { margin-top: 100px; border-top: 1px solid var(--line); background: var(--surface); }
.footer-inner { width: min(1120px, calc(100% - 40px)); min-height: 116px; margin: auto; display: flex; align-items: center; gap: 24px; }
.footer-brand { color: var(--ink); font-family: var(--serif); font-size: 20px; font-weight: 700; text-decoration: none; }
.footer-brand span { color: var(--accent); }
.footer-inner p, .footer-inner small { color: var(--muted); font-size: 12px; }
.footer-inner nav { display: flex; gap: 20px; margin-left: auto; }
.footer-inner nav a { color: var(--muted); font-size: 12px; text-decoration: none; }
.footer-inner nav a:hover { color: var(--accent); }
@media (max-width: 700px) { .footer-inner { width: min(100% - 32px, 1120px); flex-wrap: wrap; padding: 24px 0; gap: 8px 18px; } .footer-inner p { flex: 1; } .footer-inner nav { order: 2; width: 100%; margin: 8px 0 0; } .footer-inner small { margin-left: auto; } }
</style>
