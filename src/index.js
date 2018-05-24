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
                return {
                    make (properties = {}) {
                        let models = []

                        for (let i = 0; i < count; i++) {
                            models.push({...FactoryModels[model], ...properties})
                        }

                        return returnModels(models)
                    },

                    create (...args) {
                        if (typeof args[0] === 'function') {
                            let callback = args[0]
                            let models = []

                            for (let i = 0; i < count; i++) {
                                let newModel = FactoryModels[model]
                                newModel = callback(newModel)
                                models.push(newModel)
                                _store.commit(`add${model}`, model)
                            }

                            return returnModels(models)
                        }
                        let properties = args[0] ? args[0] : {}
                        let models = []

                        for (let i = 0; i < count; i++) {
                            let model = this.make(1, properties)
                            models.push(model)
                            // _store.commit(`add${model}`, model)
                        }

                        return returnModels(models)
                    },
                }
            }
        }
    }
}