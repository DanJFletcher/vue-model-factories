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

In an Vue component
```js
let user = this.factory('User').make() // {name: "Miles", email: "example@email.com", role: 1}
```