import Vue from 'vue'
import Router from 'vue-router'

import Player from '@/pages/Player'
import AlbumBar from '@/components/Album/AlbumBar'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Player',
      component: Player,

      children: [
        {
          path: '/albums/:albumId',
          name: 'Album',
          component: AlbumBar
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
