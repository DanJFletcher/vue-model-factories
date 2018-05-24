# Vue Model Factories

A Laravel inspired model factory for VueJS

## Install
```shell
npm i -S vue-model-factories
```

## Basic Usage

In `main.js`

```js
import store from './store'
import Vue from 'vue'
import VueModelFactory from 'vue-model-factories'
//...

const FactoryModels = {
  User: {
    name: "Miles",
    email: "example@email.com",
    role: 1
  },
  Cat: {
    name: "Mittens",
    owner: "Miles"
  }
}

const factory = new VueModelFactory(store).define(FactoryModels).build()

Object.defineProperty(Vue.prototype, 'factory', {
  value: factory
})

//...

```

In any Vue component
```js
let user = this.factory('User').make() // {name: "Miles", email: "example@email.com", role: 1}
```

You can also use `create()` which will commit the object to the store.
You will need to have a mutation set up with the naming convention of `add${model}` for this feature to work.
(In future releases there will be support for configuring this)

```js
let user = this.factory('User').create() // user is committed to store
```

### Making multiple models

You can pass a number as the second argument to the `factory()` function. By default this value will be `1`, and the factory will return a single object. If you pass any number greater than `1` you will receive an array of the created objects instead.

```js
let users = this.factory('User', 2).make()
console.log(users)
```

Output:
```js
  [{
    name: "Miles",
    email: "example@email.com",
    role: 1
  },
  {
    name: "Miles",
    email: "example@email.com",
    role: 1
  }]
```

### Passing overrides

Of course you likely don't want to create multiples of the same model. You can either use a library like `faker` directly in your `FactoryModel` or optionally, you can always override the defaults. Or a combination of both.

There are two options for overriding, either through an object, or you can pass a callback.

#### Passing an object
```js
let users = this.factory('User', 2).make(
  {
    name: faker.name.firstName(),
    email: faker.internet.email()
  }
)
```

This will give you a random fake email and name, which overrides the `FactoryModel` defaults. This is nice when you're makeing a single model, but when you want a collection of models, each model will get the same values.

#### Passing a callback

To solve this you can either chain `.forEach` off of the `make()` or `create()` methods, or you can pass a callback like this:

```js
let users = this.factory('User', 2).make(user => {
    return {
      name: faker.name.firstName(),
      email: faker.internet.email()
    }
  })
```