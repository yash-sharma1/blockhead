import { writable } from 'svelte/store';
import cache from '../cache';
import { executeQuery, getSession } from '../lib/network';
import { marshalInputs, marshalSelection, unmarshalSelection } from '../lib/scalars';
import { BaseStore } from './store';
export class MutationStore extends BaseStore {
    constructor({ artifact }) {
        super();
        this.kind = 'HoudiniMutation';
        this.artifact = artifact;
        this.store = writable(this.nullState);
    }
    async mutate(variables, { metadata, fetch, ...mutationConfig } = {}) {
        var _a, _b;
        const config = await this.getConfig();
        this.store.update((c) => {
            return { ...c, isFetching: true };
        });
        // treat a mutation like it has an optimistic layer regardless of
        // whether there actually _is_ one. This ensures that a query which fires
        // after this mutation has been sent will overwrite any return values from the mutation
        //
        // as far as I can tell, this is an arbitrary decision but it does give a
        // well-defined ordering to a subtle situation so that seems like a win
        //
        const layer = cache._internal_unstable.storage.createLayer(true);
        // if there is an optimistic response then we need to write the value immediately
        const optimisticResponse = mutationConfig === null || mutationConfig === void 0 ? void 0 : mutationConfig.optimisticResponse;
        // hold onto the list of subscribers that we updated because of the optimistic response
        // and make sure they are included in the final set of subscribers to notify
        let toNotify = [];
        if (optimisticResponse) {
            toNotify = cache.write({
                selection: this.artifact.selection,
                // make sure that any scalar values get processed into something we can cache
                data: (await marshalSelection({
                    selection: this.artifact.selection,
                    data: optimisticResponse,
                })),
                variables,
                layer: layer.id,
            });
        }
        const newVariables = (await marshalInputs({
            input: variables,
            artifact: this.artifact,
        }));
        try {
            // trigger the mutation
            const { result } = await executeQuery({
                config,
                artifact: this.artifact,
                variables: newVariables,
                session: await getSession(),
                cached: false,
                metadata,
                fetch,
            });
            if (result.errors && result.errors.length > 0) {
                this.store.update((s) => ({
                    ...s,
                    errors: result.errors,
                    isFetching: false,
                    isOptimisticResponse: false,
                    data: result.data,
                    variables: (newVariables || {}),
                }));
                throw result.errors;
            }
            // clear the layer holding any mutation results
            layer.clear();
            // write the result of the mutation to the cache
            cache.write({
                selection: this.artifact.selection,
                data: result.data,
                variables: newVariables,
                // write to the mutation's layer
                layer: layer.id,
                // notify any subscribers that we updated with the optimistic response
                // in order to address situations where the optimistic update was wrong
                notifySubscribers: toNotify,
                // make sure that we notify subscribers for any values that we overwrite
                // in order to address any race conditions when comparing the previous value
                forceNotify: true,
            });
            // merge the layer back into the cache
            cache._internal_unstable.storage.resolveLayer(layer.id);
            // prepare store data
            const storeData = {
                data: unmarshalSelection(config, this.artifact.selection, result.data),
                errors: (_a = result.errors) !== null && _a !== void 0 ? _a : null,
                isFetching: false,
                isOptimisticResponse: false,
                variables: newVariables,
            };
            // update the store value
            this.store.set(storeData);
            // return the value to the caller
            return (_b = storeData.data) !== null && _b !== void 0 ? _b : {};
        }
        catch (error) {
            this.store.update((s) => ({
                ...s,
                errors: error,
                isFetching: false,
                isOptimisticResponse: false,
                data: null,
                variables: newVariables,
            }));
            // if the mutation failed, roll the layer back and delete it
            layer.clear();
            cache._internal_unstable.storage.resolveLayer(layer.id);
            // bubble the mutation error up to the caller
            throw error;
        }
    }
    subscribe(...args) {
        // use it's value
        return this.store.subscribe(...args);
    }
    get nullState() {
        return {
            data: null,
            errors: null,
            isFetching: false,
            isOptimisticResponse: false,
            variables: null,
        };
    }
}
