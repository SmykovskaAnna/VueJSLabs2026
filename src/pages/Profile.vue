<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()
const isEditing = ref(false)

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

const isLoggedIn = computed(() => {
  return settings.profile.name.trim() !== '' &&
    settings.profile.email.trim() !== ''
})

function fillForm() {
  form.name = settings.profile.name
  form.email = settings.profile.email
  form.password = settings.profile.password
  form.phone = settings.profile.phone
}

function clearErrors() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.phone = ''
}

function editProfile() {
  fillForm()
  clearErrors()
  isEditing.value = true
}

function cancelEdit() {
  fillForm()
  clearErrors()
  isEditing.value = false
}

function validateForm() {
  clearErrors()

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
  isEditing.value = false

  alert(t('profile.success'))
}

function logout() {
  if (confirm(t('profile.confirmLogout'))) {
    settings.clearProfile()
    clearErrors()
    isEditing.value = true
    fillForm()
  }
}

if (isLoggedIn.value) {
  fillForm()
} else {
  isEditing.value = true
}
</script>

<template>
  <div class="profile-page">
    <div class="page-heading">
      <span class="eyebrow">YOUR ACCOUNT</span>
      <h1>{{ t('profile.title') }}</h1>
      <p>{{ t('profile.description') }}</p>
    </div>

    <div class="profile-card">

      <template v-if="isLoggedIn && !isEditing">
      <div class="profile-avatar">👤</div>

      <h2>{{ settings.profile.name }}</h2>
      <p class="profile-description">
        {{ t('profile.personalInfo') }}
      </p>

      <div class="profile-details">
        <div class="detail-item">
          <strong>{{ t('profile.name') }}:</strong>
          <span>{{ settings.profile.name }}</span>
        </div>
        <div class="detail-item">
          <strong>{{ t('profile.email') }}:</strong>
          <span>{{ settings.profile.email }}</span>
        </div>
        <div class="detail-item">
          <strong>{{ t('profile.phone') }}:</strong>
          <span>{{ settings.profile.phone }}</span>
        </div>
      </div>
      
      <div class="profile-actions">
        <button class="save-button"
        @click="editProfile"
        >
          {{ t('profile.editProfile') }}
        </button>

        <button class="logout-button"
        @click="logout"
        >
          {{ t('profile.logout') }}
        </button>
      </div>
      </template>

      <template v-else>
        <div class="profile-avatar">👤</div>

        <h2> {{ isLoggedIn ? t('profile.editProfile') : t('profile.createProfile') }}</h2>
        <p class="profile-description">
          {{ t('profile.description') }}
        </p>

      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label>{{ t('profile.name') }}</label>
          <input
            v-model="form.name"
            type="text"
            :placeholder="t('profile.namePlaceholder')"
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
            :placeholder="t('profile.passwordPlaceholder')"
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

        <button 
        v-if="isLoggedIn"
        type="button"
        class="cancel-button"
        @click="cancelEdit"
        >
          {{ t('profile.cancel') }}
        </button>
      </form>
    </template>

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

.profile-details {
  margin: 25px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 0;
  border-bottom: 1px solid #eeeaf4;
}

.detail-item span {
  color: #9992a5;
  font-size: 12px;
}

.detail-item strong {
  font-size: 14px;
  overflow-wrap: anywhere;
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

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.save-button,
.logout-button,
.cancel-button {
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

.save-button {
  background: #8b5cf6;
  color: white;
}

.save-button:hover {
  background: #7042d8;
}

.logout-button {
  background: #fff0f0;
  color: #d94848;
}

.logout-button:hover {
  background: #ffe2e2;
}

.cancel-button {
  background: #f2eff7;
  color: #77717f;
}

.cancel-button:hover {
  background: #e9e3f2;
}

</style>
