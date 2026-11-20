<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => route.params.id)
</script>

<template>
  <div>
    <RouterLink to="/admin/users">← До списку</RouterLink>
    <h1>Користувач №{{ id }}</h1>
    <article class="detail-card">
      <p><strong>ID:</strong> {{ id }}</p>
      <p><strong>Статус:</strong> Активний</p>
      <p>Дані користувача завантажені локально для демонстрації.</p>
    </article>
  </div>
</template>
