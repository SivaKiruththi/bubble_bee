import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/customer/login',
            name: 'userLogin',
            component: () => import('../views/customer/LoginView.vue'),
        },
        {
            path: '/customer/register',
            name: 'userRegistration',
            component: () => import('../views/customer/RegistrationView.vue')
        },
        {
            path: '/customer/dashboard',
            name: 'userDashboard',
            component: () => import('../views/customer/DashboardView.vue'),
        },
        {
            path: '/customer/categories',
            name: 'categories',
            component: () => import('../views/customer/CategoryView.vue'),
        },
        {
            path: '/customer/brands',
            name: 'brands',
            component: () => import('../views/customer/BrandsView.vue'),
        },
        {
            path: '/customer/products',
            name: 'products',
            component: () => import('../views/customer/ProductsView.vue'),
        },
        {
            path: '/customer/purchases',
            name: 'purchases',
            component: () => import('../views/customer/PurchasesView.vue'),
        },
        {
            path: '/admin/login',
            name: 'adminLogin',
            component: () => import('../views/admin/LoginView.vue')
        },
        {
            path: '/admin/dashboard',
            name: 'adminDashboard',
            component: () => import('../views/admin/DashboardView.vue'),
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/admin/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuthadmin)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/customer/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
