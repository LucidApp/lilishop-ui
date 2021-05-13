import Vue from 'vue';
import ViewUI from 'view-design';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  Util.title(to.meta.title);

  next();

  const name = to.name;

  if (!Cookies.get('userInfo') && name !== 'login') {
    // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    });
  } else if (Cookies.get('userInfo') && name === 'login') {
    // 判断是否已经登录且前往的是登录页
    Util.title();
    next({
      name: 'home_index'
    });
  } else {
    Util.toDefaultPage([...routers], name, router, next);
  }
});

router.afterEach((to) => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  ViewUI.LoadingBar.finish();
  window.scrollTo(0, 0);
});
