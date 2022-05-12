import VueRouter from 'vue-router'
import Home from '../page/Home'
import TemplateCommon from '../page/templateCommon'
import KKHS from '../page/KKHS.vue'
import DSTT from '../page/DSTT.vue'
import LSKH from '../page/LSKH.vue'
import a608 from '../page/608a.vue'
import DK from '../page/DK.vue'
import a612 from '../page/612a.vue'
import NBHXH from '../page/NBHXH.vue'
import CQBH from '../page/CQBH.vue'
import HP from '../page/HP.vue'


var router = new VueRouter({
    routes: [
      {
        name: 'Home',
        path: '/',
        component:Home,
        alias: '/Home'
      },
      {
        name: 'App',
        path: '/App',
        component:TemplateCommon,
        children: [
          {
            name: 'HP',
            path: '/HP',
            component:HP,
          },
          {
            name: 'CQBH',
            path: '/CQBH',
            component:CQBH,
          },
          {
            name: 'DK',
            path: '/DK',
            component:DK,
          },
          {
            name: 'NBHXH',
            path: '/NBHXH',
            component:NBHXH,
          },
          {
            name: 'KKHS',
            path: '/KKHS',
            component:KKHS,
            children: [
              {
                name: 'DSTT',
                path: '/DSTT',
                component:DSTT,
              },
              {
                name: 'LSKH',
                path: '/LSKH',
                component:LSKH,
              },
              {
                name: '608a',
                path: '/608a/:mode/:id',
                component:a608,
              },
              {
                name: '608a',
                path: '/608a',
                component:a608,
              },
              {
                name: '612a',
                path: '/612a/:mode/:id',
                component:a612,
              },
              {
                name: '612a',
                path: '/612a',
                component:a612,
              }
            ]
          }
        ]
      }
    ]
  });

export default router;