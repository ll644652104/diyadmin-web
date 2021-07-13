import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from "axios"
import store from "./vuex/index";

import "./assets/css/base.css";
const app = createApp({})
app.provide('$axios',axios)
app.provide('$message','apisfsfs')
app.use(store)


createApp(App).use(router).use(ElementPlus).use(Vuex).mount('#app')
