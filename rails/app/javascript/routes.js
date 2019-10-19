import VueRouter from 'vue-router';
import TopPage from 'views/top'
import Transition from 'views/transition_view'
import Heatmap from 'views/heatmap_page'

const router = new VueRouter({
  routes: [
    // Public
    { path: '/', component: TopPage },
    { path: '/domains/:domain_id/transition', component: Transition, props: true  },
    { path: '/pages/:page_id/heatmap', component: Heatmap, props: true },
  ]
})
export default router;
