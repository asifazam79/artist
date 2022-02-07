import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const state = {
        artistName: 'Cher'
    },
    initialStateCopy = JSON.parse(JSON.stringify(state)),
    artist = new Vuex.Store({
        plugins: [
            createPersistedState({
                storage: window.sessionStorage
            })
        ],
        state,
        mutations: {
            resetState (state) {
                Object.assign(state, initialStateCopy);
            }
        }
    });
export default artist;
