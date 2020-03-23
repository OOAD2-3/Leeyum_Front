import Vue from 'vue'
import Router from 'vue-router'
import PHome from '@/pages/PC/Phome'
import PBuy from '@/pages/buy'
import PGoods from '@/pages/PC/Pgoods'
import PTest from '@/pages/test'
import PLogin from '@/pages/PC/Plogin'
import PRelease from '@/pages/PC/Prelease'
import PDetail from '@/pages/PC/Pdetail'


import MGoods from '@/pages/Mobile/Mgoods'
import MLogin from '@/pages/Mobile/Mlogin'
import MRelease from '@/pages/Mobile/Mrelease'
import Mprofile from '@/pages/Mobile/Mprofile'
import MType from '@/pages/Mobile/type'
import MDetail from '@/pages/Mobile/Mdetail'
import MWritecomment from "@/pages/Mobile/Mwritecomment"
import MInfo from '@/pages/Mobile/MInfo'
import MMatch from '@/pages/Mobile/Mmatch'
import PMatch from '@/pages/PC/Pmatch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/phome'
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
      component:PGoods,
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
      path:'/pdetail/:articleId',
      name:'PDetail',
      component:PDetail,
    },
    {
      path:'/Pmatch/:id',
      name:'PMatch',
      component:PMatch
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
    },
    {
      path:'/mdetail/:articleId',
      name:'MDetail',
      component:MDetail
    },
    {
      path:'/Mwritecomment/:articleId',
      name:'MWritecomment',
      component:MWritecomment
    },
    {
      path:'/Minfo/:son',
      name:'MInfo',
      component:MInfo
    },
    {
      path:'/Mmatch/:id',
      name:'MMatch',
      component:MMatch
    }
  ]
})
