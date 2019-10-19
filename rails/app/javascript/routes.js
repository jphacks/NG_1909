import VueRouter from 'vue-router';
import TopPage from 'views/top'
import Transition from 'views/transition_view'

const router = new VueRouter({
  routes: [
    // Public
    { path: '/', component: TopPage },
    { path: '/transition', component: Transition },
  ]
})
export default router;
