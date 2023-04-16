export const eventNames = {
  user: {
    created: 'user.created',
  },
  collection: {
    add: {
      game: 'game.added',
      games: 'games.added',
    },
    delete: {
      games: 'games.deleted',
    },
  },
  console: {
    created: 'console.created',
    price: {
      all: 'console.price.*',
      created: 'console.price,created',
      updated: 'console.price.updated',
      deleted: 'console.price.deleted',
    },
  },
  game: {
    created: 'game.created',
    price: {
      created: 'game.price.created',
      updated: 'game.price.updated',
      deleted: 'game.price.delted',
    },
  },
  price: {
    created: 'price.created',
    updated: 'price.updated',
    deleted: 'price.deleted',
  },
};
