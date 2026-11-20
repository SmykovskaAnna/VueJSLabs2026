<script setup>
import { reports } from '../data'
</script>

<template>
  <div>
    <header class="reports-heading">
      <div>
        <p class="reports-eyebrow">АНАЛІТИКА</p>
        <h1>Звіти</h1>
        <p class="reports-intro">Короткий огляд даних вашої панелі.</p>
      </div>
      <span class="reports-count">{{ reports.length }} звіти</span>
    </header>

    <section class="reports-grid" aria-label="Список звітів">
      <article v-for="report in reports" :key="report.title" class="report-card">
        <h2>{{ report.title }}</h2>
        <p class="report-description">{{ report.description }}</p>
      </article>
    </section>
  </div>
</template>
