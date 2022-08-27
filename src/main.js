import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import setupInterceptors from "./services/setupInterceptors";
import Toaster from "@meforma/vue-toaster";
import VueSimpleAlert from "vue3-simple-alert-next";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Vue3Geolocation from "vue3-geolocation";

import mitt from "mitt";
let emitter = mitt();

setupInterceptors(store);

createApp(App)
  .use(router)
  .use(store)
  .use(Toaster)
  .use(VueSimpleAlert)
  .use(Vue3Geolocation)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("QuillEditor", QuillEditor)
  .use({
    install(app) {
      app.config.globalProperties.emitter = emitter;
    },
  })
  .mount("#app");
