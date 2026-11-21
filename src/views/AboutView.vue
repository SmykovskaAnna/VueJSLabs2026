<template>
  <main class="about-page">
    <p class="eyebrow"><span></span> ПРО ВІСНИК</p>
    <h1>Новини з <em>людським виміром</em></h1>
    <p class="about-copy">«Вісник» — навчальний сайт про людей, ідеї та зміни навколо нас. Ми прагнемо розповідати про важливе уважно й зрозуміло.</p>
  </main>
</template>

<style scoped>
.about-page { width: min(1120px, calc(100% - 40px)); min-height: 430px; margin: 96px auto 0; }
.eyebrow { display: flex; align-items: center; gap: 10px; margin: 0 0 20px; color: var(--accent); font-size: 10px; font-weight: 700; letter-spacing: .16em; }
.eyebrow span { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
h1 { max-width: 850px; margin: 0; font-family: var(--serif); font-size: clamp(48px, 7vw, 82px); font-weight: 500; line-height: .98; letter-spacing: -.055em; }
h1 em { color: var(--accent); font-weight: 500; }
.about-copy { max-width: 590px; margin: 28px 0 0 auto; color: var(--muted); font-size: 15px; line-height: 1.8; }
.about-values { display: flex; align-items: center; gap: 16px; max-width: 590px; margin: 24px 0 0 auto; padding-top: 16px; border-top: 1px solid var(--line); color: var(--ink); font-size: 11px; }
.about-values i { width: 3px; height: 3px; border-radius: 50%; background: var(--accent); }
@media (max-width: 650px) { .about-page { width: min(100% - 32px, 1120px); min-height: 380px; margin-top: 65px; } h1 { font-size: clamp(44px, 12vw, 68px); } .about-copy, .about-values { margin-left: 0; } .about-copy { margin-top: 22px; } .about-values { flex-wrap: wrap; gap: 10px; font-size: 10px; } }
</style>
