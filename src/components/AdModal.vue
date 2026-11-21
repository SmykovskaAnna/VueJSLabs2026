<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close">
        <section class="ad-modal" role="dialog" aria-modal="true" aria-labelledby="ad-modal-title">
          <button class="close-button" type="button" aria-label="Закрити вікно" @click="close">×</button>
          <p class="eyebrow">ПАРТНЕРСЬКА ПРОПОЗИЦІЯ</p>
          <div class="modal-art" aria-hidden="true"><span>✳</span><i></i><b></b></div>
          <h2 id="ad-modal-title">Відкрийте нові місця поруч.</h2>
          <p class="modal-copy">Збережіть ідею для наступної прогулянки: маленькі маршрути часто приводять до великих відкриттів.</p>
          <button class="modal-action" type="button" @click="close">Чудово, дякую <span aria-hidden="true">→</span></button>
          <small>Демонстраційний рекламний блок</small>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop { position: fixed; z-index: 20; inset: 0; display: grid; place-items: center; padding: 20px; background: rgba(24, 18, 31, .64); }
.ad-modal { position: relative; width: min(440px, 100%); padding: 34px; color: var(--ink); background: var(--surface); box-shadow: 0 25px 80px rgba(0, 0, 0, .25); }
.close-button { position: absolute; top: 12px; right: 14px; width: 34px; height: 34px; border: 0; color: var(--muted); background: transparent; font-size: 28px; line-height: 1; }
.eyebrow { margin: 0; color: var(--accent); font-size: 9px; font-weight: 700; letter-spacing: .14em; }
.modal-art { position: relative; display: grid; height: 130px; place-items: center; overflow: hidden; margin: 24px 0; background: var(--soft); }
.modal-art span { z-index: 1; color: var(--accent); font-size: 56px; }
.modal-art i, .modal-art b { position: absolute; width: 116px; height: 116px; border: 1px solid var(--accent); border-radius: 50%; opacity: .35; }
.modal-art b { width: 80px; height: 80px; }
.ad-modal h2 { margin: 0; font-family: var(--serif); font-size: 32px; font-weight: 500; line-height: 1.1; letter-spacing: -.035em; }
.modal-copy { margin: 14px 0 22px; color: var(--muted); font-size: 13px; line-height: 1.7; }
.modal-action { display: flex; width: 100%; justify-content: space-between; padding: 13px 15px; border: 0; color: var(--accent-contrast); background: var(--accent); font-size: 12px; font-weight: 700; }
.ad-modal > small { display: block; margin-top: 15px; color: var(--muted); font-size: 9px; text-align: center; }
.modal-enter-active, .modal-leave-active { transition: opacity .2s ease; }
.modal-enter-active .ad-modal, .modal-leave-active .ad-modal { transition: transform .2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .ad-modal, .modal-leave-to .ad-modal { transform: translateY(12px) scale(.98); }
</style>
