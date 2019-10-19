import VueRouter from 'vue-router';
import TopPage from 'views/top'

const router = new VueRouter({
  routes: [
    // Public
    { path: '/', component: TopPage },
  ]
})

router.beforeEach((to, from, next) => {
  // authentication周り
});


export default router;
