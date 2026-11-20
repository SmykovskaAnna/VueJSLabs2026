<script setup>
import { users } from '../data'
</script>

<template>
  <div>
    <h1>Користувачі</h1>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Ім’я</th><th>Email</th><th>Роль</th><th></th></tr></thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td><RouterLink :to="`/admin/user/${user.id}`">Деталі</RouterLink></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
