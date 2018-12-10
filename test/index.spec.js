import Factory from '../src'

const FactoryModels = {
  User: {
    name: 'Miles',
    email: 'example@email.com',
    role: 1,
  },
  Cat: {
    name: 'Mittens',
    owner: 'Miles',
  },
}

test('Can create factory without store', () => {
  const factory = new Factory()

  expect(factory).toBeTruthy()
})

test('Can make a model', () => {
  const FactoryModel = {
    User: {
      name: 'Jim',
    },
  }
  const user = new Factory()
    .define(FactoryModel)
    .build()('User')
    .make()

  expect(user.name).toBe('Jim')
})

test('Can make many models', () => {
  const users = new Factory()
    .define(FactoryModels)
    .build()('User', 10)
    .make()

  expect(users.length).toBe(10)
  expect(users[0].name).toBe('Miles')
})

test('Can override default model through make argument', () => {
  const user = new Factory()
    .define(FactoryModels)
    .build()('User')
    .make({
      name: 'Jim Bean',
    })

  expect(user.name).toBe('Jim Bean')
})

test('Can override default model through creaet argument', () => {
  const store = {
    commit() {},
  }

  const user = new Factory(store)
    .define(FactoryModels)
    .build()('User')
    .create({
      name: 'Jim Bean',
    })

  expect(user.name).toBe('Jim Bean')
})

test('Can create factory with store', () => {
  const store = {}
  const factory = new Factory(store)

  expect(factory).toBeTruthy()
})

test('Use create method to make model', () => {
  const store = {
    commit() {},
  }
  const user = new Factory(store)
    .build()('User')
    .create()

  expect(user.name).toBe('Miles')
})

test('Callback function gets called {modelCount} times with create method', () => {
  const store = {
    commit () {}
  }
  const mockCallback = jest.fn()

  new Factory(store)
    .build()('User', 2)
    .make(mockCallback)

  expect(mockCallback.mock.calls.length).toBe(2)
})

test('Callback function gets called {modelCount} times with make method', () => {
  const mockCallback = jest.fn()

  new Factory()
    .build()('User', 2)
    .make(mockCallback)

  expect(mockCallback.mock.calls.length).toBe(2)
})

test('Store gets commit method invoked with callback', () => {
  const store = {
    commit: jest.fn(),
  }

  new Factory(store)
    .build()('User', 2)
    .create(() => {})

  expect(store.commit.mock.calls.length).toBe(2)
})

test('Can not call private methods', () => {
  const factory = new Factory().build()

  expect(factory.buildModelWithCallback).toBe(undefined)
})

test('Support data object for model factory', () => {
  const FactoryModel = {
    User: {
      data: { name: 'Jim' },
    },
  }
  const user = new Factory()
    .define(FactoryModel)
    .build()('User')
    .make()

  expect(user.name).toBe('Jim')
})

test('Customize store mutation name', () => {
  const FactoryModels = {
    User: {
      data: { name: 'Jim' },
      mutation: 'pushUser',
    },
  }
  const store = {
    state: {
      users: [],
    },
    mutations: {
      pushUser: (state, user) => state.users.push(user),
    },
    commit(mutation, data = {}) {
      this.mutations[mutation](this.state, data)
    },
  }
  const user = Factory(store)
    .define(FactoryModels)
    .build()('User')
    .create()

  expect(user).not.toBe(undefined)
  expect(store.state.users.length).toBe(1)
})
