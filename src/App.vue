<template>
  <div id="app">
    <div>
      <router-view name="landing"></router-view>
    </div>
    <div>
      <router-view name="particles"></router-view>
    </div>
    <div class="left">
      <router-view name="sidebar"
        ref="sidebar">
      </router-view>
    </div>
    <div class="right">
      <router-view name="d3graph"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      queryNotFound: false
    }
  },
  methods: {
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

}

div.left {
  width: 25%;
  margin-left: 1.5%;
  margin-right: 0.75%;
  float: left;
  padding-top: 25px;
}

div.right {
  border-width: 2px;
  border-color: red;
  width: 70.5%;
  margin-left: 0.75%;
  margin-right: 1.5%;
  float: right;
  padding-top: 25px;
}

body {
  overflow: hidden;
  background-color: #fbfbfb;
}
</style>
