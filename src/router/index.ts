import { createRouter, createWebHistory } from 'vue-router'
import PersonnesListe from '../views/personnes/personnes-liste.vue'
import PersonneNouveau from '../views/personnes/personne-nouveau.vue'
import PersonneModifier from '../views/personnes/personne-modifier.vue'
import PersonneDetail from '../views/personnes/personne-detail.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/personnes',
      name: 'personne-list',
      component: PersonnesListe,
    },
    {
      path: '/personnes/nouveau',
      name: 'personne-create',
      component: PersonneNouveau,
    },
    {
      path: '/personnes/:id/modifier',
      name: 'personne-modifier',
      component: PersonneModifier,
    },
    {
      path: '/personnes/:id',
      name: 'personne-detail',
      component: PersonneDetail,
    },
    { path: '/', redirect: { name: 'personne-list' } },
    { path: '/:pathMatch(.*)*', redirect: { name: 'personne-list' } },
  ],
})

export default router
