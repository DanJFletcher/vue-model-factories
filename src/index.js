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
                function buildModelWithCallback(callback, commit = false) {
                    let models = []

                    for (let i = 0; i < count; i++) {
                        let newModel = FactoryModels[model]
                        newModel = callback(newModel)
                        models.push(newModel)
                        commit ? _store.commit(`add${model}`, model) :''
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
                            models.push({...FactoryModels[model], ...properties})
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
                            let model = this.make(1, properties)
                            models.push(model)
                            _store.commit(`add${model}`, model)
                        }

                        return returnModels(models)
                    },
                }
            }
        }
    }
}