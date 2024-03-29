import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login/Login')
    },
    {
      path: '/forgot',
      name: '忘记密码页',
      component: () => import('@/pages/login/Forgot')
    },
    {
      path: '/register',
      name: '注册页',
      component: () => import('@/pages/login/Register')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: '数据看板',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/dashboard')
        },
        {
          path: 'nlp',
          name: '服务端用例',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'project',
              name: '项目管理',
              component: () => import('@/pages/case'),
            }
          ]
        },
        {
          path: 'parent2',
          name: '父级路由2',
          meta: {
            icon: 'form'
          },
          component: BlankView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/device'),
            }
          ]
        },
        {
          path: 'mock',
          name: 'mock配置',
          meta: {
            icon: 'form'
          },
          component: BlankView,
          children: [
            {
              path: 'httpMock',
              name: 'HttpMock',
              component: () => import('@/pages/mock'),
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: PageView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/device',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/device')
          }
        }
      ]
    }
  ]
}

export default options
