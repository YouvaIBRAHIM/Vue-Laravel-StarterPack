import { createRouter, createWebHistory } from "vue-router";
import isLogged from '@/middleware/isLogged';
import isNotLogged from '@/middleware/isNotLogged';

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      middleware: isLogged
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      middleware: isNotLogged
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;
  
    return (...parameters) => {
      context.next(...parameters);
      const nextMiddleware = nextFactory(context, middleware, index);
      subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}
  
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
  
      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);
  
      return middleware[0]({ ...context, next: nextMiddleware });
    }
  
    return next();
});

export default router;
