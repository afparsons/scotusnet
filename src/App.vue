<template>
  <div id="app">
    <div class="left">
      <router-view name="sidebar"
        ref="sidebar"
        v-on:graph="updateGraph($event)"
        v-on:degreeExpansion="degreeExpansion($event)"
        v-on:degreeContraction="degreeContraction($event)"
        v-bind:selectedCaseName="selectedCaseName"
        v-bind:currentQueryCaseName="currentQueryCaseName"
        v-bind:currentQueryCaseID="currentQueryCaseID"
        v-bind:usrCitation="usrCitation"
        v-bind:courtListenerID="courtListenerID">
      </router-view>
    </div>
    <div class="right">
      <router-view name="d3graph"
        v-on:updateSidebar="updateSidebar($event)"
        v-bind:nodes="nodes"
        v-bind:links="links">
      </router-view>
    </div>
  </div>

<!--
v-bind:query="query"
v-bind:queryNotFound="queryNotFound"
v-bind:currentQueryCaseName="currentQueryCaseName"
v-bind:selectedCaseName="selectedCaseName"
v-bind:usrCitation="usrCitation"
v-bind:neo4jID="neo4jID"
-->

</template>

<script>
export default {
  name: 'App',
  data () {
    return {

      // Node info
      query: '',
      queryNotFound: false,
      currentQueryCaseName: '',
      currentQueryCaseID: '',
      selectedCaseName: '',
      usrCitation: '',
      neo4jID: '',
      courtListenerID: '',

      // D3Force
      nodes: [],
      links: []
    }
  },
  methods: {
    updateGraph: function (graphData) {
      this.nodes = graphData.nodes
      this.links = graphData.links
      this.currentQueryCaseName = graphData.name
      this.currentQueryCaseID = graphData.courtListenerID
      this.selectedCaseName = graphData.name
      this.courtListenerID = graphData.courtListenerID
      this.usrCitation = graphData.usrCitation
    },
    updateSidebar: function (node) {
      this.selectedCaseName = node.name
      this.usrCitation = node.usrCitation
      this.courtListenerID = node.id
      this.nodes.forEach((n, i) => {
        if (n._color === '#FF1493') {
          n._color = null
        }
        if (n.id === node.id && n.id !== this.currentQueryCaseID) {
          n._color = '#FF1493'
        }
      })
    },
    degreeExpansion: function (id) {
      this.nodes.push(
        { id: id + 'a', name: 'A', _color: '#ABCDEF' },
        { id: id + 'b', name: 'B', _color: '#ABCDEF' }
      )
      this.links.push(
        { sid: id, tid: id + 'a' },
        { sid: id, tid: id + 'b' }
      )
    },
    degreeContraction: function (id) {
      this.links.forEach((l, i) => {
        if (l.sid === id && l.tid === id + 'a') {
          this.links.splice(i, 1)
        }
        if (l.sid === id && l.tid === id + 'b') {
          this.links.splice(i, 1)
        }
      })
      this.nodes.forEach((n, i) => {
        if (n.id === id + 'a') {
          this.nodes.splice(i, 1)
        }
        if (n.id === id + 'b') {
          this.nodes.splice(i, 1)
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 25px;
}

div.left {
  width: 25%;
  margin-left: 1.5%;
  margin-right: 0.75%;
  float:left;
}

div.right {
  border-width: 2px;
  border-color: red;
  width: 70.5%;
  margin-left: 0.75%;
  margin-right: 1.5%;
  float: right;
}

body {
  overflow: hidden;
  background-color: #fbfbfb;
}
</style>
