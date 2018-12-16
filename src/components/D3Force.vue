<template>
  <div class="d3">
    <sui-menu attached="top" tabular>
      <a
        is="sui-menu-item"
        v-for="tab in tabs"
        :key="tab"
        :active="isActive(tab)"
        @click="select(tab)"
      >
        {{ tab }}
      </a>
    </sui-menu>
    <sui-segment style="height:90vh" attached="bottom">
      <d3-network id="id-d3-network" v-on:node-click="nodeClick" :net-nodes="nodes" :net-links="links" :options="options" />
    </sui-segment>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
export default {
  name: 'D3',
  components: {
    D3Network
  },
  computed: {
    nodes () {
      return this.$store.state.nodes
    },
    links () {
      return this.$store.state.links
    }
  },
  data () {
    return {
      tabs: ['Query', 'Opinion'],
      active: 'Query',
      options: {
        nodeSize: 50,
        canvas: false,
        nodeLabels: true
      }
    }
  },
  mounted: function () {
    var width = document.getElementById('id-d3-network').getBoundingClientRect().width
    this.$set(this.options, 'force', width * 7)
  },
  methods: {
    isActive (name) {
      return this.active === name
    },
    select (name) {
      this.active = name
    },
    nodeClick (event, node) {
      this.$store.commit('updateSidebar', node)
    }
  }
}
</script>

<style src="vue-d3-network/dist/vue-d3-network.css">

</style>
