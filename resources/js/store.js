import {Characters} from './modules/characters';
import {Locations} from './modules/locations';
import {Messages} from './modules/messages';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {Characters, Locations, Messages},
    state: {
        user: {}
    },
    mutations: {}
});

export default store;