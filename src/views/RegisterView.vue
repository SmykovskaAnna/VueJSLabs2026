<script setup>
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '../components/AuthCard.vue'
import FormField from '../components/FormField.vue'

const auth = inject('auth')
const router = useRouter()
const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const errors = reactive({ name: '', email: '', password: '', confirmPassword: '', form: '' })

function validate() {
  errors.form = ''
  errors.name = form.name.trim() ? '' : 'Введіть ім’я'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'Введіть коректний email'
  errors.password = form.password.length >= 6
    ? ''
    : 'Пароль має містити щонайменше 6 символів'
  errors.confirmPassword = form.password === form.confirmPassword
    ? ''
    : 'Паролі не співпадають'
  return Object.values(errors).every((error) => !error)
}

async function submit() {
  if (!validate()) return
  try {
    await auth.register(form.email, form.password, form.name)
    router.replace('/admin/dashboard')
  } catch (error) {
    errors.form = error.message || 'Не вдалося створити акаунт.'
  }
}
</script>

<template>
  <AuthCard title="Реєстрація">
    <form @submit.prevent="submit">
      <FormField id="name" v-model="form.name" label="Ім’я" :error="errors.name" />
      <FormField id="email" v-model="form.email" label="Email" type="email" :error="errors.email" />
      <FormField id="password" v-model="form.password" label="Пароль" type="password" :error="errors.password" />
      <FormField
        id="confirmPassword"
        v-model="form.confirmPassword"
        label="Підтвердження пароля"
        type="password"
        :error="errors.confirmPassword"
      />
      <p v-if="errors.form" class="field-error" role="alert">{{ errors.form }}</p>
      <button type="submit" class="button wide">Створити акаунт</button>
    </form>

    <template #footer>
      Вже є акаунт? <RouterLink to="/login">Увійти</RouterLink>
    </template>
  </AuthCard>
</template>
