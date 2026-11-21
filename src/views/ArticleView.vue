<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { articles } from '../data/news'
import AdSlot from '../components/AdSlot.vue'

defineEmits(['open-ad'])
const route = useRoute()
const article = computed(() => articles.find((item) => item.id === route.params.id))
</script>

<template>
  <article v-if="article" class="article-page">
    <RouterLink class="back-link" to="/">← Усі новини</RouterLink>
    <header class="article-header">
      <p class="eyebrow">{{ article.category }} <span>·</span> {{ article.date }}</p>
      <h1>{{ article.title }}</h1>
      <p class="article-lead">{{ article.excerpt }}</p>
    </header>
    <img class="article-image" :src="article.image" :alt="article.title" />
    <div class="article-body">
      <p v-for="paragraph in article.content" :key="paragraph">{{ paragraph }}</p>
      <AdSlot class="article-ad" @open-ad="$emit('open-ad')" />
      <div class="article-end"><span></span><span>Кінець матеріалу</span><span></span></div>
    </div>
  </article>
  <section v-else class="missing-article">
    <p class="eyebrow">МАТЕРІАЛ НЕ ЗНАЙДЕНО</p><h1>Цієї новини немає у випуску.</h1><RouterLink class="back-link" to="/">Повернутися до новин →</RouterLink>
  </section>
</template>

<style scoped>
.article-page { width: min(800px, calc(100% - 40px)); margin: 48px auto 0; }
.back-link { color: var(--muted); font-size: 12px; text-decoration: none; }
.back-link:hover { color: var(--accent); }
.article-header { padding: 48px 0 32px; text-align: center; }
.eyebrow { margin: 0 0 18px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.eyebrow span { padding: 0 5px; color: var(--muted); }
h1 { margin: 0 auto; font-family: var(--serif); font-size: clamp(38px, 6vw, 64px); font-weight: 500; line-height: 1.02; letter-spacing: -.05em; }
.article-lead { max-width: 570px; margin: 20px auto 0; color: var(--muted); font-size: 16px; line-height: 1.65; }
.article-image { width: 100%; max-height: 460px; aspect-ratio: 1.7; object-fit: cover; }
.article-body { max-width: 620px; margin: 38px auto 0; }
.article-body p { margin: 0 0 22px; color: var(--ink); font-family: var(--serif); font-size: 19px; line-height: 1.8; }
.article-ad { margin: 32px 0; }
.article-end { display: flex; align-items: center; gap: 12px; margin-top: 40px; color: var(--muted); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.article-end span:first-child, .article-end span:last-child { height: 1px; flex: 1; background: var(--line); }
.missing-article { width: min(720px, calc(100% - 40px)); margin: 120px auto; text-align: center; }
.missing-article h1 { margin-bottom: 25px; }
</style>
