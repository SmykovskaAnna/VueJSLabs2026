<script setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../stores/cart'

const { t } = useI18n()
const cart = useCartStore()

const products = [
  { id: 1, price: 1499, emoji: '🕷️' },
  { id: 2, price: 1799, emoji: '⚔️' },
  { id: 3, price: 1299, emoji: '⚡' },
  { id: 4, price: 1999, emoji: '🤖' },
]

function addToCart(product, index) {
  cart.add({
    id: product.id,
    productIndex: index,
    price: product.price,
    emoji: product.emoji
  })
}
</script>

<template>
  <div class="catalog">
    <div class="catalog-heading">
      <h1>{{ t('catalog.title') }}</h1>
      <p>{{ t('catalog.subtitle') }}</p>
    </div>

    <div class="products">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">
          <span class="product-emoji">{{ product.emoji }}</span>
        </div>

        <div class="product-info">
          <span class="category">
            {{ t(`catalog.products.${index}.category`) }}
          </span>

          <h2>{{ t(`catalog.products.${index}.name`) }}</h2>

          <p>
            {{ t(`catalog.products.${index}.description`) }}
          </p>

          <div class="product-bottom">
            <strong>{{ product.price }} ₴</strong>

            <button @click="addToCart(product, index)">
              {{ t('catalog.add') }} +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  padding: 35px 0;
}

.catalog-heading {
  text-align: center;
  margin-bottom: 35px;
}

.catalog-heading h1 {
  font-size: 36px;
  margin: 12px 0;
  color: #24212d;
}

.catalog-heading p {
  color: #85818e;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border: 1px solid #eeeaf4;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(80, 60, 120, 0.1);
}

.product-image {
  height: 190px;
  background: #f5f1fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-emoji {
  font-size: 85px;
}

.product-info {
  padding: 20px;
}

.category {
  color: #8b5cf6;
  font-size: 12px;
  font-weight: 600;
}

.product-info h2 {
  font-size: 19px;
  margin: 10px 0;
  color: #292631;
}

.product-info p {
  font-size: 13px;
  color: #88838f;
  min-height: 35px;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 18px;
}

.product-bottom strong {
  font-size: 17px;
  color: #292631;
}

.product-bottom button {
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 13px;
  cursor: pointer;
}

.product-bottom button:hover {
  background: #7042d8;
}

@media (max-width: 500px) {
  .catalog-heading h1 {
    font-size: 27px;
  }
}
</style>
