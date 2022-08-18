import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import setupInterceptors from './services/setupInterceptors';
import Toaster from '@meforma/vue-toaster';
import VueSimpleAlert from "vue3-simple-alert-next";


import mitt from 'mitt';
let emitter = mitt();

setupInterceptors(store);

createApp(App)
.use(router)
.use(store)
.use(Toaster)
.use(VueSimpleAlert )
.component("font-awesome-icon", FontAwesomeIcon)
.use({
    install(app) {
      app.config.globalProperties.emitter = emitter;
    }
  })
.mount("#app");
