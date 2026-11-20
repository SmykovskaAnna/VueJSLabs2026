<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const auth = inject('auth')
const router = useRouter()

function logout() {
  auth.logout()
  router.replace('/login')
}
</script>

<template>
  <div class="admin-shell">
    <aside class="sidebar">
      <RouterLink to="/admin/dashboard" class="brand">Моя панель</RouterLink>
      <nav>
        <RouterLink to="/admin/dashboard">Огляд</RouterLink>
        <RouterLink to="/admin/users">Користувачі</RouterLink>
        <RouterLink to="/admin/reports">Звіти</RouterLink>
      </nav>
    </aside>

    <section class="admin-content">
      <header class="topbar">
        <div v-if="auth.user" class="current-user">
          <strong>{{ auth.user.name }}</strong>
          <span>{{ auth.user.email }}</span>
        </div>
        <button type="button" class="button small logout-button" @click="logout">Вийти</button>
      </header>
      <main class="page">
        <RouterView />
      </main>
    </section>
  </div>
</template>
