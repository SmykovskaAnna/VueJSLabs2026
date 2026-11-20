import { reactive } from 'vue'

const ACCOUNTS_KEY = 'lab2-accounts'
const USER_KEY = 'lab2-user'

function readAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY)
  if (!savedAccounts) return []

  const accounts = JSON.parse(savedAccounts)
  if (!Array.isArray(accounts)) {
    throw new Error('Не вдалося прочитати список акаунтів.')
  }
  return accounts
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

async function hashPassword(password) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Для роботи автентифікації потрібне безпечне з’єднання HTTPS або localhost.')
  }

  const input = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', input)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function saveUser(account) {
  const user = { name: account.name, email: account.email }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  auth.user = user
}

const accountsAtStartup = readAccounts()
const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || 'null')
const activeAccount = savedUser
  ? accountsAtStartup.find((account) => account.email === normalizeEmail(savedUser.email))
  : null

if (savedUser && !activeAccount) {
  localStorage.removeItem(USER_KEY)
}

export const auth = reactive({
  user: activeAccount ? { name: activeAccount.name, email: activeAccount.email } : null,
  async register(email, password, name) {
    const normalizedEmail = normalizeEmail(email)
    const accounts = readAccounts()

    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error('Акаунт із таким email вже зареєстрований.')
    }

    const account = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
    }
    accounts.push(account)
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    saveUser(account)
  },
  async login(email, password) {
    const normalizedEmail = normalizeEmail(email)
    const passwordHash = await hashPassword(password)
    const account = readAccounts().find((item) => item.email === normalizedEmail)

    if (!account || account.passwordHash !== passwordHash) {
      throw new Error('Неправильний email або пароль. Перевірте дані або зареєструйтеся.')
    }

    saveUser(account)
  },
  logout() {
    this.user = null
    localStorage.removeItem(USER_KEY)
  },
})
