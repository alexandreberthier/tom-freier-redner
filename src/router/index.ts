import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from "@/views/AboutView.vue";
import WeddingView from "@/views/WeddingView.vue";
import ChildCelebrationView from "@/views/ChildCelebrationView.vue";
import FuneralView from "@/views/FuneralView.vue";
import ImprintView from "@/views/ImprintView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/uebermich',
      name: 'about',
      component: AboutView
    },
    {
      path: '/hochzeit',
      name: 'wedding',
      component: WeddingView
    },
    {
      path: '/willkommensfest',
      name: 'child-celebration',
      component: ChildCelebrationView
    },
    {
      path: '/lebens-und-trauerfeier',
      name: 'celebrations',
      component: FuneralView
    },
    {
      path: '/impressum',
      name: 'imprint',
      component: ImprintView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        return {
          el: element,
          behavior: 'smooth'
        };
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
