// Type definitions for vue-model-factories >=0.0.13
// Project: vue-model-factories
// Definitions by: Dan Fletcher <github.com/DanJFletcher>

declare module 'vue-model-factories' {

    export default function VueModelFactory(store?: IStore): IFactoryGenerator;

    interface IStore {
        commit(mutation: string, object: {}): void;
    }

    interface IFactoryGenerator {
        define: (models: IModelMap<{}>) => IFactoryGenerator;
        build: () => (modelKey: string, count?: number) => IModelFactory;
    }

    interface IModelFactory {

        /**
         * Creates the model or models in memory but does not save to
         * the registered store.
         */
        make: (args?: any[]) => IModel<{}> | Array<IModel<{}>>;
        /**
         * Stores the model or models in the registered store.
         */
        create: (args?: any[]) => IModel<{}> | Array<IModel<{}>>;
    }
}

declare interface IModelMap<T extends {}> {
    [key: string]: IModel<{}> | T;
}

declare interface IModel<T> {
    data: T;
    mutation?: string;
}
