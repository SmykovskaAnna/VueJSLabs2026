<script setup>
import { articles } from '../data/news'
import { RouterLink } from 'vue-router'
import NewsCard from '../components/NewsCard.vue'
import AdSlot from '../components/AdSlot.vue'
import { formatIssueDate } from '../utils/currentDate'

defineEmits(['open-ad'])
const issueDate = formatIssueDate()
</script>

<template>
  <div class="home-page">
    <section class="intro">
      <div class="intro-content">
        <p class="eyebrow"><span class="edition-mark"></span> {{ issueDate }}</p>
        <h1>Події, що <em>мають значення.</em></h1>
        <p class="intro-copy">Добірка історій про людей, ідеї та зміни, які формують наше сьогодення.</p>
        <RouterLink class="intro-link" :to="`/article/${articles[0].id}`">
          Читати головну історію <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </section>
    <section class="news-section" aria-labelledby="news-title">
      <div class="section-heading">
        <div><p class="eyebrow">ЧИТАЙТЕ ЗАРАЗ</p><h2 id="news-title">Останні новини</h2></div>
        <span class="article-count">{{ articles.length }} матеріали</span>
      </div>
      <div class="news-list">
        <NewsCard v-for="(article, index) in articles" :key="article.id" :article="article" :index="index" />
      </div>
    </section>
    <AdSlot class="home-ad" @open-ad="$emit('open-ad')" />
  </div>
</template>

<style scoped>
.home-page { width: min(1120px, calc(100% - 40px)); margin: auto; }
.intro { padding: 102px 0 96px; border-bottom: 1px solid var(--line); }
.intro-content { max-width: 900px; margin: 0 auto; text-align: center; }
.eyebrow { display: flex; align-items: center; justify-content: center; gap: 9px; margin: 0 0 24px; color: var(--accent); font-size: 10px; font-weight: 700; letter-spacing: .16em; }
.edition-mark { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 13%, transparent); }
h1, h2, h3 { font-family: var(--serif); }
h1 { max-width: 100%; margin: 0; font-size: clamp(64px, 8vw, 112px); font-weight: 500; line-height: .91; letter-spacing: -.06em; }
h1 em { display: block; color: var(--accent); font-weight: 500; }
.intro-copy { max-width: 540px; margin: 26px auto 0; color: var(--muted); font-size: 15px; line-height: 1.7; }
.intro-link { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin-top: 32px; padding: 13px 18px; border: 1px solid var(--accent); color: var(--surface); background: var(--accent); font-size: 12px; font-weight: 700; text-decoration: none; transition: background .2s ease, color .2s ease; }
.intro-link:hover { color: var(--accent); background: transparent; }
.intro-link span { font-size: 15px; }
.news-section { padding-top: 52px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 24px; }
.section-heading .eyebrow { margin-bottom: 8px; }
h2 { margin: 0; font-size: 30px; font-weight: 500; letter-spacing: -.035em; }
.article-count { padding-bottom: 5px; color: var(--muted); font-size: 12px; }
.news-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 34px 24px; }
.home-ad { margin-top: 52px; }
@media (max-width: 650px) { .home-page { width: min(100% - 32px, 1120px); } .intro { padding: 72px 0 66px; } h1 { font-size: clamp(46px, 13vw, 68px); } .intro-copy { margin-top: 20px; } .intro-link { margin-top: 24px; } .news-list { grid-template-columns: 1fr; gap: 30px; } .section-heading { margin-bottom: 20px; } }
</style>
