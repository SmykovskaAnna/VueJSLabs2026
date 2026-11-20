import { reactive } from 'vue'

export const users = reactive([
  { id: 1, name: 'Anna Smykovska', email: 'annas@gmail.com', role: 'Admin' },
  { id: 2, name: 'Andrij Shevchenko', email: 'andrijs@gmail.com', role: 'Editor' },
  { id: 3, name: 'Anastasiia Kryvoruczko', email: 'anastasiak@gmail.com', role: 'Viewer' },
])

export const reports = reactive([
  {
    title: 'Щомісячний звіт',
    description: 'Підсумки роботи панелі та загальна статистика.',
  },
  {
    title: 'Активність користувачів',
    description: 'Огляд активності та залученості користувачів.',
  },
  {
    title: 'Аналітика',
    description: 'Ключові показники та короткий огляд змін.',
  },
])
