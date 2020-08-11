import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../components/Product.vue'
import NewProduct from '../components/NewProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import Cart from '../components/Cart.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-product',
      component: NewProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:product_id',
      name: 'edit-product',
      component: EditProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        requiresAuth: true
      }
    }
  ]  
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check if not logged in
    if(!firebase.auth().currentUser){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next()
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if(firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router