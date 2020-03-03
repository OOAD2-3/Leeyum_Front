import Vue from 'vue'
import Router from 'vue-router'
import PHome from '@/pages/PC/Phome'
import PBuy from '@/pages/buy'
import PGoods from '@/pages/PC/Pgoods'
import PTest from '@/pages/test'
import PLogin from '@/pages/PC/Plogin'
import PRelease from '@/pages/PC/Prelease'
import Pprofile from '@/pages/PC/Pprofile'


import MHome from '@/pages/Mobile/Mhome'
import MGoods from '@/pages/Mobile/Mgoods'
import MLogin from '@/pages/Mobile/Mlogin'
import MRelease from '@/pages/Mobile/Mrelease'
import Mprofile from '@/pages/Mobile/Mprofile'
import MType from '@/pages/Mobile/type'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/pgoods'
    },

    {
      path:'/phome',
      name:'PHome',
      component:PHome
    },
    {
      path:'/pbuy',
      name:'PBuy',
      component: PBuy
    },
    {
      path:'/pgoods',
      name:'PGoods',
      component:PGoods
    },
    {
      path:'/plogin',
      name:'PLogin',
      component:PLogin
    },
    {
      path:'/prelease',
      name:'PRelease',
      component:PRelease
    },
    {
      path:'/ptest',
      name:'PTest',
      component:PTest
    },
    {
      path:'/pprofile',
      name:'Pprofile',
      component:Pprofile
    },





    {
      path:'/mhome',
      name:'MHome',
      component:MHome
    },
    {
      path:'/mgoods',
      name:'MGoods',
      component:MGoods
    },
    {
      path:'/mlogin',
      name:'MLogin',
      component:MLogin
    },
    {
      path:'/mrelease',
      name:'MRelease',
      component:MRelease
    },
    {
      path:'/mprofile',
      name:'Mprofile',
      component:Mprofile
    },
    {
      path:'/mtype',
      name:'MType',
      component:MType
    }
  ]
})
