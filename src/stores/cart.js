import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.qty, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      )
    }
  },

  actions: {
    add(product) {
      const existingItem = this.items.find(
        item => item.id === product.id
      )

      if (existingItem) {
        existingItem.qty++
      } else {
        this.items.push({
          ...product,
          qty: 1
        })
      }
    },

    remove(id) {
      this.items = this.items.filter(item => item.id !== id)
    },

    clear() {
      this.items = []
    }
  },

  persist: true
})
