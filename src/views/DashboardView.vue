<script setup>
import { computed, inject } from 'vue'
import StatCard from '../components/StatCard.vue'
import { reports, users } from '../data'

const auth = inject('auth')
const activeSessions = computed(() => (auth?.user ? 1 : 0))
</script>

<template>
  <div>
    <h1>Огляд</h1>
    <section class="stats">
      <StatCard label="Користувачі" :value="users.length" />
      <StatCard label="Звіти" :value="reports.length" />
      <StatCard label="Активні сесії" :value="activeSessions" />
    </section>
  </div>
</template>
