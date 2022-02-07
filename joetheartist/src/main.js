import Vue from 'vue/dist/vue.js';
import App from './App.vue';
import router from './router';
import artist from './store/artist';

Vue.config.productionTip = false;

let loadApp = function () {
    /* eslint-disable no-new */
    return new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: { App },
        data: {
            artist: artist
        }

    });
};

loadApp();
