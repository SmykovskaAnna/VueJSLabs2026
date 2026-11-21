<template>
  <section class="not-found">
    <p class="eyebrow">ПОМИЛКА 404</p>
    <h1>Схоже, цієї сторінки ще не написали.</h1>
    <p>Перевірте адресу або поверніться до свіжих новин.</p>
    <RouterLink to="/">На головну <span>↗</span></RouterLink>
  </section>
</template>

<style scoped>
.not-found { width: min(620px, calc(100% - 40px)); min-height: 480px; margin: 110px auto 0; text-align: center; }
.eyebrow { color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: .15em; }
h1 { margin: 18px 0 12px; font-family: var(--serif); font-size: clamp(38px, 6vw, 56px); font-weight: 500; line-height: 1.05; letter-spacing: -.045em; }
.not-found > p:not(.eyebrow) { color: var(--muted); font-size: 14px; }
.not-found a { display: inline-flex; gap: 8px; margin-top: 22px; color: var(--accent); font-size: 13px; font-weight: 700; text-decoration: none; }
</style>
