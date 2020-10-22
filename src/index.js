/* IMPORT SCRIPTS */
import oneFunc from "./js/one";

document.addEventListener("DOMContentLoaded", () => {
	console.log("test");
	oneFunc();
});

import Vue from 'vue';
import App from '@/App.vue';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app')

/* IMPORT STYLES */
import "./styles/index.css";