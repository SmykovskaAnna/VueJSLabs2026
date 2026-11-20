
<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()

const form = reactive({
  name: settings.profile.name,
  email: settings.profile.email,
  password: settings.profile.password,
  phone: settings.profile.phone
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  phone: ''
})

function validateForm() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.phone = ''

  let valid = true

  if (!form.name.trim()) {
    errors.name = t('profile.errors.name')
    valid = false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('profile.errors.email')
    valid = false
  }

  if (form.password.length < 6) {
    errors.password = t('profile.errors.password')
    valid = false
  }

  if (!/^\+?[0-9\s()-]{9,20}$/.test(form.phone)) {
    errors.phone = t('profile.errors.phone')
    valid = false
  }

  return valid
}

function saveProfile() {
  if (!validateForm()) {
    return
  }

  settings.saveProfile({ ...form })

  alert(t('profile.success'))
}
</script>

<template>
  <div class="profile-page">
    <div class="page-heading">
      <span class="eyebrow">YOUR ACCOUNT</span>
      <h1>{{ t('profile.title') }}</h1>
      <p>Manage your HEROBOX account.</p>
    </div>

    <div class="profile-card">
      <div class="profile-avatar">👤</div>

      <h2>{{ form.name || 'HEROBOX USER' }}</h2>
      <p class="profile-description">
        Your personal information
      </p>

      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label>{{ t('profile.name') }}</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your name"
          />
          <span v-if="errors.name" class="error">
            {{ errors.name }}
          </span>
        </div>

        <div class="form-group">
          <label>{{ t('profile.email') }}</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
          />
          <span v-if="errors.email" class="error">
            {{ errors.email }}
          </span>
        </div>

        <div class="form-group">
          <label>{{ t('profile.password') }}</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Minimum 6 characters"
          />
          <span v-if="errors.password" class="error">
            {{ errors.password }}
          </span>
        </div>

        <div class="form-group">
          <label>{{ t('profile.phone') }}</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+380 123 456 789"
          />
          <span v-if="errors.phone" class="error">
            {{ errors.phone }}
          </span>
        </div>

        <button type="submit" class="save-button">
          {{ t('profile.save') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 35px 0;
}

.page-heading {
  margin-bottom: 30px;
}

.eyebrow {
  color: #8b5cf6;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.page-heading h1 {
  font-size: 32px;
  margin: 12px 0;
}

.page-heading p {
  color: #88838f;
}

.profile-card {
  max-width: 550px;
  margin: auto;
  background: white;
  border: 1px solid #eeeaf4;
  border-radius: 16px;
  padding: 30px;
}

.profile-avatar {
  width: 75px;
  height: 75px;
  background: #f0eafb;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 35px;
  margin: 0 auto 15px;
}

.profile-card h2,
.profile-description {
  text-align: center;
}

.profile-card h2 {
  font-size: 20px;
}

.profile-description {
  color: #9992a5;
  font-size: 13px;
  margin: 8px 0 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
}

.form-group input {
  padding: 13px;
  border: 1px solid #e7e2ee;
  border-radius: 8px;
  outline: none;
  font-family: inherit;
}

.form-group input:focus {
  border-color: #8b5cf6;
}

.error {
  color: #e5484d;
  font-size: 12px;
}

.save-button {
  width: 100%;
  padding: 14px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.save-button:hover {
  background: #7042d8;
}
</style>
