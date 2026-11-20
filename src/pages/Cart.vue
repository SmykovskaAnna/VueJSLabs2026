<script setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../stores/cart'

const { t } = useI18n()
const cart = useCartStore()

function formatPrice(price) {
  return price.toFixed(2) + ' ₴'
}
</script>

<template>
  <div class="cart-page">
    <div class="page-heading">
      <span class="eyebrow">YOUR COLLECTION</span>
      <h1>{{ t('cart.title') }}</h1>
      <p>{{ t('cart.count') }}: {{ cart.totalCount }}</p>
    </div>

    <div v-if="cart.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛍️</div>
      <h2>{{ t('cart.empty') }}</h2>
      <p>HEROBOX — Collect your favorite heroes.</p>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="cart-item"
        >
          <div class="item-icon">
            {{ item.emoji || '🎁' }}
          </div>

          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>{{ formatPrice(item.price) }}</p>

            <span>
              {{ t('cart.count') }}: {{ item.qty }}
            </span>
          </div>

          <div class="item-total">
            {{ formatPrice(item.price * item.qty) }}
          </div>

          <button
            class="remove-button"
            @click="cart.remove(item.id)"
          >
            ×
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>{{ t('cart.total') }}</h2>

        <div class="summary-row">
          <span>{{ t('cart.count') }}</span>
          <strong>{{ cart.totalCount }}</strong>
        </div>

        <div class="summary-row total-row">
          <span>{{ t('cart.total') }}</span>
          <strong>{{ formatPrice(cart.totalPrice) }}</strong>
        </div>

        <button class="clear-button" @click="cart.clear()">
          {{ t('cart.clear') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
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
  margin: 12px 0;
  font-size: 32px;
}

.page-heading p {
  color: #88838f;
}

.empty-cart {
  background: white;
  border: 1px solid #eeeaf4;
  border-radius: 16px;
  padding: 65px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #88838f;
  margin-top: 10px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 25px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 18px;
  background: white;
  border: 1px solid #eeeaf4;
  border-radius: 12px;
  padding: 20px;
}

.item-icon {
  width: 65px;
  height: 65px;
  background: #f5f1fa;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 36px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 16px;
}

.item-info p {
  margin: 5px 0;
}

.item-info span {
  font-size: 12px;
  color: #88838f;
}

.item-total {
  font-weight: 700;
  white-space: nowrap;
}

.remove-button {
  border: none;
  background: #f5f1fa;
  color: #8b5cf6;
  border-radius: 7px;
  width: 32px;
  height: 32px;
  font-size: 22px;
  cursor: pointer;
  flex-shrink: 0;
}

.remove-button:hover {
  background: #eee6fa;
}

.cart-summary {
  background: white;
  border: 1px solid #eeeaf4;
  border-radius: 12px;
  padding: 22px;
}

.cart-summary h2 {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  color: #77717f;
}

.total-row {
  border-top: 1px solid #eeeaf4;
  padding-top: 15px;
  color: #292631;
}

.clear-button {
  width: 100%;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 13px;
  cursor: pointer;
  margin-top: 15px;
}

.clear-button:hover {
  background: #7042d8;
}

@media (max-width: 700px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    gap: 10px;
    padding: 12px;
  }

  .item-icon {
    width: 55px;
    height: 55px;
    font-size: 30px;
  }
}
</style>
