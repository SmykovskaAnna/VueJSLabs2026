<script setup>
import { useCssModule } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  article: { type: Object, required: true },
  index: { type: Number, required: true },
})

const styles = useCssModule()
</script>

<template>
  <article :class="styles.card">
    <RouterLink :class="styles.image" :to="`/article/${article.id}`">
      <img :src="article.image" :alt="article.title" />
      <span :class="styles.imageIndex">0{{ index + 1 }}</span>
    </RouterLink>
    <div :class="styles.copy">
      <div :class="styles.meta"><span :class="styles.category">{{ article.category }}</span><time>{{ article.date }}</time></div>
      <h3><RouterLink :to="`/article/${article.id}`">{{ article.title }}</RouterLink></h3>
      <p>{{ article.excerpt }}</p>
      <RouterLink :class="styles.readLink" :to="`/article/${article.id}`">Читати матеріал <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </article>
</template>

<style module src="../styles/NewsCard.module.css"></style>
