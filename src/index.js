const returnModels = models => (models.length > 1 ? models : models[0])

const getModel = object => (object.data ? object.data : object)

const saveFactory = store => (object, mutation) =>
  store.commit(mutation, object)

let FactoryModels = {}

export default (store = {}) => {
  const save = saveFactory(store)

  return {
    define(models) {
      FactoryModels = models
      return this
    },

    build() {
      return (model, count = 1) => {
        const _model = getModel(FactoryModels[model])
        const mutation = FactoryModels[model].mutation
          ? FactoryModels[model].mutation
          : `add${model}`

        function buildModelWithCallback(callback, commit = false) {
          const models = []

          for (let i = 0; i < count; i++) {
            const newModel = callback(_model)

            models.push(newModel)
            commit ? save(newModel, mutation) : ''
          }

          return returnModels(models)
        }

        return {
          make(...args) {
            if (typeof args[0] === 'function') {
              return buildModelWithCallback(args[0])
            }

            const [properties] = args
            const models = []

            for (let i = 0; i < count; i++) {
              models.push({ ...getModel(_model), ...properties })
            }

            return returnModels(models)
          },

          create(...args) {
            if (typeof args[0] === 'function') {
              return buildModelWithCallback(args[0], true)
            }

            const properties = args[0] ? args[0] : {}
            const models = []

            for (let i = 0; i < count; i++) {
              let model = this.make(properties)

              models.push(model)
              save(model, mutation)
            }

            return returnModels(models)
          },
        }
      }
    },
  }
}
