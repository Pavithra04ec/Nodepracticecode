import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VuejsDialog from "vuejs-dialog"
import deletevue from '../src/components/';
import vueConfirmationButton from "vue-confirmation-button";




Vue.use(deletevue)
Vue.use(vueConfirmationButton)
Vue.use(VuejsDialog)
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.component("confirmation-modal", {
	template: "#modal",
	props: ["open", "user"],
	methods: {
		onConfirm() {
			this.$emit("confirm");
		},
		onCancel() {
			this.$emit("cancel");
		}
	}
});
