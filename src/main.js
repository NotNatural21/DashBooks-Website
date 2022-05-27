import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import { reactive } from 'vue';
import '@quasar/extras/material-icons/material-icons.css'

const userDictMaster = {"projects": {}, "clients": {}, "colours": {'colourWhite':{'name': 'Clear', 'colour': '#ffffff'}}, "users": {}, "records": {"accounts": [],"payee": [], "categories": {}, 'savedTransactions': {}}, "saveVersion": 20, "showGST": true, "version": '0.5.0', "timeLogged": {"01/01/1970": {'hours': 0, 'pay': 0}}, 'archive': {'projects': {}}}

export const userDict = reactive({...userDictMaster})


const app = createApp(App)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

app.use(router)

app.mount('#app')

