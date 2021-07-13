import { createRouter, createWebHistory } from 'vue-router'
// import Home from 'views/home/Home.vue'
import Login from 'components/common/login/Login.vue'

import Monitor from 'views/monitor/Monitor'
import Service from 'views/service/Service'
import User from 'views/user/User'
import Channel from 'views/channel/Channel'
import Domain from 'views/domain/Domain'



const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'views/home/Home.vue'),
    children: [
      {
        path: 'channel',
        component: Channel
      },
      {
        path: 'monitor',
        component: Monitor
      },
      {
        path: 'service',
        component: Service
      },
      {
        path: 'user',
        component: User
      },
      {
        path: 'domain',
        component: Domain
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("Authorization");
  if (to.path == "/") {
    if (token) {
      router.push({
        name: "Home"
      });
    } else {
      next();
    }
  } else {
    if (token) {
      next();
    } else {
      router.push({
        name: "Login"
      });
    }
  }
});

export default router
