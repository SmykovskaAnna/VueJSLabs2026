<template>
  <main class="simple-home">
    <section class="simple-home-card">
      <p class="simple-home-label">ЛАБОРАТОРНА РОБОТА №2</p>
      <h1>Вітаємо!</h1>
      <p class="simple-home-description">Увійдіть або створіть акаунт, щоб продовжити.</p>
      <nav class="simple-home-actions" aria-label="Автентифікація">
        <RouterLink to="/login" class="button">Увійти</RouterLink>
        <RouterLink to="/register" class="button secondary">Реєстрація</RouterLink>
      </nav>
    </section>
  </main>
</template>
