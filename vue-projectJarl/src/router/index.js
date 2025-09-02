import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormView from '@/views/CatalogViews/FormView.vue'
import ContentView from '@/views/CatalogViews/ContentView.vue'
import ChildGoods from '@/views/HeaderViews/ChildGoods.vue'
import SportGoods from '@/views/HeaderViews/SportGoods.vue'
import ThermalGoods from '@/views/HeaderViews/ThermalGoods.vue'
import GirlsGoods from '@/views/HeaderViews/GirlsGoods.vue'
import CompanyView from '@/views/FooterViews/CompanyView.vue'
import ContactInfoView from '@/views/FooterViews/ContactInfoView.vue'
import AdvantagesView from '@/views/FooterViews/AdvantagesView.vue'
import FeedBackView from '@/views/CatalogViews/FeedBackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
    },
    {
      path: '/content',
      name: 'content',
      component: ContentView,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBackView,
    },
    {
      path: '/childGoods',
      name: 'childGoods',
      component: ChildGoods,
    },
    {
      path: '/sportGoods',
      name: 'sportGoods',
      component: SportGoods,
    },
    {
      path: '/thermalGoods',
      name: 'thermalGoods',
      component: ThermalGoods,
    },
    {
      path: '/girlsGoods',
      name: 'girlsGoods',
      component: GirlsGoods,
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactInfoView,
    },
    {
      path: '/advantages',
      name: 'advantages',
      component: AdvantagesView,
    },
  ],
})

export default router
