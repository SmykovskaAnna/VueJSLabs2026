<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { uk } from 'date-fns/locale'

const STORAGE_KEY = 'vue-todo-lab1'
const TASKS_PER_PAGE = 5

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return []

    const parsedTasks = JSON.parse(savedTasks)
    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

const tasks = ref(loadTasks())
const currentPage = ref(1)
const filters = reactive({
  title: '',
  description: '',
  status: '',
  priority: '',
  dateFrom: null,
  dateTo: null,
})
const totalCount = computed(() => tasks.value.length)
const activeCount = computed(() => tasks.value.filter((task) => task.status === 'active').length)
const doneCount = computed(() => tasks.value.filter((task) => task.status === 'done').length)

const filteredTasks = computed(() => {
  const title = filters.title.trim().toLowerCase()
  const description = filters.description.trim().toLowerCase()
  const fromDate = filters.dateFrom
    ? new Date(filters.dateFrom).setHours(0, 0, 0, 0)
    : null
  const toDate = filters.dateTo
    ? new Date(filters.dateTo).setHours(23, 59, 59, 999)
    : null

  return tasks.value.filter((task) => {
    const taskDate = new Date(task.createdAt).getTime()
    return task.title.toLowerCase().includes(title)
      && task.description.toLowerCase().includes(description)
      && (!filters.status || task.status === filters.status)
      && (!filters.priority || task.priority === filters.priority)
      && (fromDate === null || taskDate >= fromDate)
      && (toDate === null || taskDate <= toDate)
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredTasks.value.length / TASKS_PER_PAGE))
})

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * TASKS_PER_PAGE
  return filteredTasks.value.slice(start, start + TASKS_PER_PAGE)
})

watch(filters, () => {
  currentPage.value = 1
}, { deep: true })

watch(filteredTasks, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

watch(tasks, (updatedTasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
}, { deep: true })
const newTask = reactive({
  title: '',
  description: '',
  priority: 'medium',
})
const errorMessage = ref('')
const editingId = ref(null)
const editError = ref('')
const editDraft = reactive({ title: '', description: '', priority: 'medium' })

function clearFilters() {
  filters.title = ''
  filters.description = ''
  filters.status = ''
  filters.priority = ''
  filters.dateFrom = null
  filters.dateTo = null
}

function addTask() {
  const title = newTask.title.trim()
  const description = newTask.description.trim()

  if (!title || !description) {
    errorMessage.value = 'Введіть назву й опис завдання.'
    return
  }

  tasks.value.push({
    id: Date.now(),
    title,
    description,
    status: 'active',
    createdAt: new Date().toISOString(),
    priority: newTask.priority,
  })

  newTask.title = ''
  newTask.description = ''
  newTask.priority = 'medium'
  errorMessage.value = ''
}

function toggleStatus(task) {
  task.status = task.status === 'active' ? 'done' : 'active'
}

function deleteTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

function startEdit(task) {
  editingId.value = task.id
  editDraft.title = task.title
  editDraft.description = task.description
  editDraft.priority = task.priority
  editError.value = ''
}

function saveEdit(task) {
  const title = editDraft.title.trim()
  const description = editDraft.description.trim()

  if (!title || !description) {
    editError.value = 'Введіть назву й опис завдання.'
    return
  }

  task.title = title
  task.description = description
  task.priority = editDraft.priority
  editingId.value = null
  editError.value = ''
}

function cancelEdit() {
  editingId.value = null
  editError.value = ''
}

function formatDate(value) {
  return new Intl.DateTimeFormat('uk-UA').format(new Date(value))
}
</script>

<template>
  <main class="app-shell">
    <header class="hero">
      <div>
        <p class="eyebrow">Vue.js 3 · Composition API</p>
        <h1>Мій список завдань</h1>
      </div>
      <div class="stats" aria-label="Статистика завдань">
        <div><strong>{{ totalCount }}</strong><span>Всього</span></div>
        <div><strong>{{ activeCount }}</strong><span>Активних</span></div>
        <div><strong>{{ doneCount }}</strong><span>Завершених</span></div>
      </div>
    </header>

    <section class="panel add-panel" aria-labelledby="add-heading">
      <h2 id="add-heading">Додати завдання</h2>
      <form class="add-form" @submit.prevent="addTask">
        <label>
          Назва
          <input v-model="newTask.title" type="text" placeholder="Наприклад: Зробити лабораторну">
        </label>
        <label>
          Опис
          <textarea v-model="newTask.description" rows="1" placeholder="Короткий опис завдання" />
        </label>
        <label>
          Пріоритет
          <select v-model="newTask.priority">
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </label>
        <button class="primary" type="submit">Додати</button>
      </form>
      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    </section>

    <section class="panel filters" aria-labelledby="filters-heading">
      <div class="section-title">
        <h2 id="filters-heading">Фільтри</h2>
        <button class="ghost" type="button" @click="clearFilters">Очистити фільтри</button>
      </div>
      <div class="filter-grid">
        <label>Назва<input v-model="filters.title" type="search" placeholder="Пошук за назвою"></label>
        <label>Опис<input v-model="filters.description" type="search" placeholder="Пошук за описом"></label>
        <label>
          Статус
          <select v-model="filters.status">
            <option value="">Усі</option>
            <option value="active">Активні</option>
            <option value="done">Завершені</option>
          </select>
        </label>
        <label>
          Пріоритет
          <select v-model="filters.priority">
            <option value="">Усі</option>
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </label>
        <label>
          Створено від
          <VueDatePicker
            v-model="filters.dateFrom"
            :locale="uk"
            :time-config="{ enableTimePicker: false }"
            :hide-month-year-select="false"
            :year-range="[1900, 2100]"
            auto-apply
            placeholder="Оберіть дату"
          />
        </label>
        <label>
          Створено до
          <VueDatePicker
            v-model="filters.dateTo"
            :locale="uk"
            :time-config="{ enableTimePicker: false }"
            :hide-month-year-select="false"
            :year-range="[1900, 2100]"
            auto-apply
            placeholder="Оберіть дату"
          />
        </label>
      </div>
    </section>

    <section class="task-list" aria-live="polite" aria-label="Список завдань">
      <article
        v-for="task in paginatedTasks"
        :key="task.id"
        class="task-card"
        :class="{ done: task.status === 'done' }"
      >
        <template v-if="editingId !== task.id">
          <button
            class="status-toggle"
            type="button"
            :aria-label="task.status === 'active' ? 'Позначити виконаним' : 'Повернути в активні'"
            @click="toggleStatus(task)"
          >
            {{ task.status === 'done' ? '✓' : '' }}
          </button>
          <div class="task-content">
            <div class="task-heading">
              <h3>{{ task.title }}</h3>
              <span class="priority" :class="'priority-' + task.priority">
                {{ task.priority === 'high' ? 'Високий' : task.priority === 'low' ? 'Низький' : 'Середній' }}
              </span>
            </div>
            <p>{{ task.description }}</p>
            <small>{{ formatDate(task.createdAt) }}</small>
          </div>
          <div class="actions">
            <button type="button" @click="startEdit(task)">Редагувати</button>
            <button class="delete" type="button" @click="deleteTask(task.id)">Видалити</button>
          </div>
        </template>

        <div v-else class="edit-form">
          <label>Назва<input v-model="editDraft.title" type="text"></label>
          <label>Опис<textarea v-model="editDraft.description" rows="1" /></label>
          <label>
            Пріоритет
            <select v-model="editDraft.priority">
              <option value="low">Низький</option>
              <option value="medium">Середній</option>
              <option value="high">Високий</option>
            </select>
          </label>
          <p v-if="editError" class="error" role="alert">{{ editError }}</p>
          <div class="actions">
            <button class="primary" type="button" @click="saveEdit(task)">Зберегти</button>
            <button type="button" @click="cancelEdit">Скасувати</button>
          </div>
        </div>
      </article>

      <p v-if="!paginatedTasks.length" class="empty">
        {{ tasks.length ? 'За цими фільтрами завдань не знайдено.' : 'Поки що завдань немає.' }}
      </p>
    </section>

    <nav v-show="totalPages > 1" class="pagination" aria-label="Пагінація">
      <button type="button" :disabled="currentPage === 1" @click="currentPage--">←</button>
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        :class="{ active: page === currentPage }"
        @click="currentPage = page"
      >{{ page }}</button>
      <button type="button" :disabled="currentPage === totalPages" @click="currentPage++">→</button>
    </nav>
  </main>
</template>
