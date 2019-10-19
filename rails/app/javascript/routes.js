import VueRouter from 'vue-router';
import TopPage from 'views/top'
import Transition from 'views/transition_view'

const router = new VueRouter({
  mode: "history",
  routes: [
    // Public
    // { path: '/', component: Transition },
    { path: '/', component: Transition },
  ]
})

// router.beforeEach((to, from, next) => {
  // authentication周り
// });


export default router;
