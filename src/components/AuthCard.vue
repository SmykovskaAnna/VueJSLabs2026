<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <header>
        <slot name="header">
          <h1>{{ title }}</h1>
        </slot>
      </header>

      <slot />

      <footer class="auth-footer">
        <slot name="footer" />
      </footer>
    </section>
  </main>
</template>
