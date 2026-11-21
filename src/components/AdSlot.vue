<template>
  <button class="ad-slot" type="button" aria-label="Відкрити рекламну пропозицію" @click="$emit('open-ad')">
    <span class="ad-label">РЕКЛАМА</span>
    <span class="ad-copy"><strong>Знайдіть свій наступний маршрут</strong><small>Ідеї для подорожей поруч із вами</small></span>
    <span class="ad-action">Дізнатися більше <span aria-hidden="true">↗</span></span>
  </button>
</template>

<script setup>
defineEmits(['open-ad'])
</script>

<style scoped>
.ad-slot { display: flex; width: 100%; min-height: 108px; align-items: center; gap: 24px; padding: 22px 26px; border: 1px solid var(--line); color: var(--ink); background: var(--surface); text-align: left; transition: border-color .2s ease, transform .2s ease; }
.ad-slot:hover { transform: translateY(-2px); border-color: var(--accent); }
.ad-label { align-self: flex-start; padding: 5px 7px; border: 1px solid var(--line); color: var(--muted); font-size: 9px; letter-spacing: .12em; }
.ad-copy { display: grid; gap: 6px; }
.ad-copy strong { font-family: var(--serif); font-size: 18px; font-weight: 500; }
.ad-copy small { color: var(--muted); font-size: 11px; }
.ad-action { display: inline-flex; gap: 8px; margin-left: auto; color: var(--accent); font-size: 11px; font-weight: 700; white-space: nowrap; }
@media (max-width: 600px) { .ad-slot { gap: 12px; padding: 18px 14px; } .ad-label { display: none; } .ad-copy strong { font-size: 15px; } .ad-action { max-width: 78px; white-space: normal; } }
</style>
