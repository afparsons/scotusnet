import Vue from 'vue'
import Router from 'vue-router'
import VueNeo4j from 'vue-neo4j'
import SuiVue from 'semantic-ui-vue'
import D3Force from '@/components/D3Force'
import Sidebar from '@/components/Sidebar'

Vue.use(Router)
Vue.use(VueNeo4j)
Vue.use(SuiVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        sidebar: Sidebar,
        d3graph: D3Force
      }
    }
  ]
})
