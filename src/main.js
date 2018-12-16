// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'

Vue.use(Vuex)
Vue.use(VueParticles)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0,

    // D3Force
    nodes: [],
    links: [],

    // Graph information
    currentQueryCaseName: '',
    currentQueryCaseID: '',
    selectedCaseName: '',
    courtListenerID: '',
    usrCitation: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    updateGraph (state, graphData) {
      state.nodes = graphData.nodes
      state.links = graphData.links
      state.currentQueryCaseName = graphData.name
      state.currentQueryCaseID = graphData.courtListenerID
      state.selectedCaseName = graphData.name
      state.courtListenerID = graphData.courtListenerID
      state.usrCitation = graphData.usrCitation
    },
    updateSidebar (state, node) {
      state.selectedCaseName = node.name
      state.usrCitation = node.usrCitation
      state.courtListenerID = node.id
      state.nodes.forEach((n, i) => {
        if (n._color === '#FF1493') {
          n._color = null
        }
        if (n.id === node.id && n.id !== state.currentQueryCaseID) {
          n._color = '#FF1493'
        }
      })
    },
    updateNodesArray (state, nodesArray) {
      nodesArray.forEach((n, i) => {
        state.nodes.push(n)
      })
    },
    updateLinksArray (state, linksArray) {
      linksArray.forEach((l, i) => {
        state.links.push(l)
      })
    },
    contractNodesArray (state, nodesArray) {
      nodesArray.forEach((n) => {
        state.nodes.forEach((s, i) => {
          if (state.nodes[i].id === n) {
            state.nodes.splice(i, 1)
          }
        })
        state.links.forEach((l, i) => {
          if (l.tid === n) {
            state.links.splice(i, 1)
          }
        })
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
