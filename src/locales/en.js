export default {
  app: {
    title: 'HEROBOX',
    subtitle: 'Collect your favorite heroes',
    catalog: 'Catalog',
    cart: 'Cart',
    profile: 'Profile',
    language: 'Language'
  },

  catalog: {
    title: 'Collectible Figures',
    subtitle: 'Find a hero from your favorite universe',
    add: 'Add to cart',
    price: 'Price',
    products: [
      {
        name: 'Spider-Man',
        description: 'The legendary Marvel hero',
        category: 'Marvel'
      },
      {
        name: 'Darth Vader',
        description: 'The dark lord of the galaxy',
        category: 'Star Wars'
      },
      {
        name: 'Harry Potter',
        description: 'The boy who lived',
        category: 'Harry Potter'
      },
      {
        name: 'Iron Man',
        description: 'Genius inventor and superhero',
        category: 'Marvel'
      }
    ]
  },

  cart: {
    title: 'My Cart',
    empty: 'Your cart is empty',
    total: 'Total',
    remove: 'Remove',
    clear: 'Clear cart',
    count: 'Quantity'
  },

  profile: {
    title: 'My Profile',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    phone: 'Phone number',
    save: 'Save',
    success: 'Profile saved successfully!',
    errors: {
      name: 'Enter your name',
      email: 'Enter a valid email address',
      password: 'Password must contain at least 6 characters',
      phone: 'Enter a valid phone number'
    },
    description: 'Manage your HEROBOX account.',
    personalInfo: 'Your personal information',
    editProfile: 'Edit profile',
    logout: 'Log out',
    createProfile: 'Create profile',
    formDescription: 'Enter your personal information',
    cancel: 'Cancel',
    confirmLogout: 'Are you sure you want to log out?',
  }
}
