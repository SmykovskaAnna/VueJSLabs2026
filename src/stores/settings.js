import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    locale: 'ua',

    profile: {
      name: '',
      email: '',
      password: '',
      phone: ''
    }
  }),

  actions: {
    setLocale(lang) {
      this.locale = lang
    },

    saveProfile(profile) {
      this.profile = profile
    },
    
  clearProfile() {
      this.profile = {
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    }
  },

  persist: true
})
