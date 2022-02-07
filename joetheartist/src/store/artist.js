import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const state = {
        searchArtist: '',
        filterItems: ''
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
            setSearchArtist (state, payload) {
                state.searchArtist = payload.searchArtist;
            },
            setFilterItems (state, payload) {
                state.filterItems = payload.filterItems;
            },
            resetState (state) {
                Object.assign(state, initialStateCopy);
            }
        }
    });
export default artist;
