import VueRouter from 'vue-router'
import Home from '../page/Home'
import TemplateCommon from '../page/templateCommon'
import KKHS from '../page/KKHS.vue'
import DSTT from '../page/DSTT.vue'
import LSKH from '../page/LSKH.vue'
import a608 from '../page/608a.vue'
import DK from '../page/DK.vue'

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
            name: 'DK',
            path: '/DK',
            component:DK,
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
                path: '/608a',
                component:a608,
              }
            ]
          }
        ]
      }
    ]
  });

export default router;