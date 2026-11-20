<script setup>
import { inject, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthCard from '../components/AuthCard.vue'
import FormField from '../components/FormField.vue'

const auth = inject('auth')
const router = useRouter()
const route = useRoute()
const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const message = ref('')

function validate() {
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'Введіть коректний email'
  errors.password = form.password.length >= 6
    ? ''
    : 'Пароль має містити щонайменше 6 символів'
  return !errors.email && !errors.password
}

async function submit() {
  if (!validate()) return
  message.value = ''
  try {
    await auth.login(form.email, form.password)
    router.replace(route.query.redirect || '/admin/dashboard')
  } catch (error) {
    message.value = error.message || 'Не вдалося виконати вхід.'
  }
}
</script>

<template>
  <AuthCard title="Вхід">
    <template #header>
      <h1>Вхід до системи</h1>
    </template>

    <form @submit.prevent="submit">
      <FormField
        id="email"
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="admin@example.com"
        :error="errors.email"
        @blur="validate"
      />
      <FormField
        id="password"
        v-model="form.password"
        label="Пароль"
        type="password"
        placeholder="Мінімум 6 символів"
        :error="errors.password"
        @blur="validate"
      />
      <p v-if="message" class="field-error" role="alert">{{ message }}</p>
      <button type="submit" class="button wide">Увійти</button>
    </form>

    <template #footer>
      Немає акаунта? <RouterLink to="/register">Зареєструватися</RouterLink>
    </template>
  </AuthCard>
</template>
