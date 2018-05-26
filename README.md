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
By default, you will need to have a mutation set up with the naming convention of `add${model}` for this feature to work.
Alternatively, if you would like to set your own naming convention you can pass in your Factory Models like this:

```js
{
  User: {
    data: {
      name: "Miles",
      email: "example@email.com",
      role: 1
    }
    mutations: "pushUser"
  },
}
```

When this object is passed to the factory's `define()` method, it will know to use the value of `mutation` when committing to the store.

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

## Advanced usage

### Passing overrides

Of course you likely don't want to create multiples of the same model. You can either use a library like `faker` directly in your `FactoryModel` or optionally, you can always override the defaults. Or a combination of both.

There are two options for overriding, either through an object, or you can pass a callback.

### Passing an object
```js
let users = this.factory('User', 2).make(
  {
    name: faker.name.firstName(),
    email: faker.internet.email()
  }
)
```

This will give you a random fake email and name, which overrides the `FactoryModel` defaults. This is nice when you're makeing a single model, but when you want a collection of models, each model will get the same values.

### Passing a callback

To solve this you can either chain `.forEach` off of the `make()` or `create()` methods, or you can pass a callback like this:

```js
let users = this.factory('User', 2).make(user => {
    return {
      name: faker.name.firstName(),
      email: faker.internet.email()
    }
  })
```
### Relationships

Relationships can be created between models by using the `create()` method and callbacks. For example you may want a owner to pet relationship:

```js
const user = this.factory('User').create(user => {
  return {
    ...user,
    id: 1, // this could be auto-incremented or generated at the Model Factory
    pet: this.factory('Cat').create({id: 1}).id
  }
})
```
Of course this example could be normalized. The user doesn't really need a reference to the pet, but it's shown here for demonstration.

Here's a much more complicated example that combines object overrides with callbacks and chaining `forEach()` just to demonstrate the flexibility of this factory:
```js
factory('Person', 50).create(person => {
  factory('Sensor').create({
    asset: person.id
  })
  return {
    ...person,
    tools: [...(factory('Tool', _.random(1, 3)).create({
      person: person.id
    }).forEach(tool => factory('Sensor').create({
      fields: {
        asset: tool.id
      }
    })))].map(tool => tool.id)
  }
})
```

Admittedly that is not the prettiest code to read. But of course you can abstract all the complexity however you wish.