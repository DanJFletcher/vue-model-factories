function returnModels(models) {
    return models.length > 1 ? models : models[0]
}

let FactoryModels = {}
let _store = {}

export default  (store = {}) => {
    _store = store
    return {
        define (models) {
            FactoryModels = models
            return this
        },
        build () {
            return (model = '', count = 1) => {
                let _model = getModel(FactoryModels[model])
                let _mutation = FactoryModels[model].mutation
                    ? FactoryModels[model].mutation
                    : `add${model}`

                function getModel(object) {
                    return object.data ? object.data : object
                }

                function save(object) {
                    _store.commit(_mutation, object)
                }

                function buildModelWithCallback(callback, commit = false) {
                    let models = []

                    for (let i = 0; i < count; i++) {
                        let newModel = _model
                        newModel = callback(newModel)
                        models.push(newModel)
                        commit ? save(newModel) : ''
                    }

                    return returnModels(models)
                }
                return {
                    make (...args) {
                        if (typeof args[0] === 'function') {
                            return buildModelWithCallback(args[0])
                        }

                        let properties = args[0]
                        let models = []

                        for (let i = 0; i < count; i++) {
                            models.push({...getModel(_model), ...properties})
                        }

                        return returnModels(models)
                    },

                    create (...args) {
                        if (typeof args[0] === 'function') {
                            return buildModelWithCallback(args[0], true)
                        }

                        let properties = args[0] ? args[0] : {}
                        let models = []

                        for (let i = 0; i < count; i++) {
                            let model = this.make()
                            models.push(model)
                            save(model)
                        }

                        return returnModels(models)
                    },
                }
            }
        }
    }
}