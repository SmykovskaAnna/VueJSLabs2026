export default {
  app: {
    title: 'HEROBOX',
    subtitle: 'Збирай своїх улюблених героїв',
    catalog: 'Каталог',
    cart: 'Кошик',
    profile: 'Профіль',
    language: 'Мова'
  },

  catalog: {
    title: 'Колекційні фігурки',
    subtitle: 'Знайди героя зі свого улюбленого всесвіту',
    add: 'До кошика',
    price: 'Ціна',
    products: [
      {
        name: 'Людина-павук',
        description: 'Легендарний герой Marvel',
        category: 'Marvel'
      },
      {
        name: 'Дарт Вейдер',
        description: 'Темний володар галактики',
        category: 'Star Wars'
      },
      {
        name: 'Гаррі Поттер',
        description: 'Хлопчик, який вижив',
        category: 'Harry Potter'
      },
      {
        name: 'Шрек',
        description: 'Найвідоміший огр',
        category: 'Animation'
      },
      {
        name: 'Залізна людина',
        description: 'Геніальний винахідник і супергерой',
        category: 'Marvel'
      },
      {
        name: 'Ґрогу',
        description: 'Маленький герой великої галактики',
        category: 'Star Wars'
      }
    ]
  },

  cart: {
    title: 'Мій кошик',
    empty: 'Ваш кошик поки порожній',
    total: 'Разом',
    remove: 'Видалити',
    clear: 'Очистити кошик',
    count: 'Кількість'
  },

  profile: {
    title: 'Мій профіль',
    name: "Ім'я",
    email: 'Електронна пошта',
    password: 'Пароль',
    phone: 'Номер телефону',
    save: 'Зберегти',
    success: 'Профіль успішно збережено!',
    errors: {
      name: "Введіть ім'я",
      email: 'Введіть правильну електронну пошту',
      password: 'Пароль повинен містити мінімум 6 символів',
      phone: 'Введіть правильний номер телефону'
    }
  }
}
