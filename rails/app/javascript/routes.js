import VueRouter from 'vue-router';
import TopPage from 'views/top'
import Transition from 'views/transition_view'
import Heatmap from 'views/heatmap_page'

const router = new VueRouter({
  routes: [
    // Public
    { path: '/', component: TopPage },
    { path: '/transition', component: Transition },
    { path: '/heatmap', component: Heatmap },
  ]
})
export default router;
