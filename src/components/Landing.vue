<template>
  <div class="landing">
    <div class="search">
      <input class="landing-input"
        autocomplete="on"
        autofocus="on"
        placeholder="Search a case..."
        v-model="query"
        v-on:keyup.enter="searchAndDisplayGraph()"/>
    </div>
    <div class="landing-left">
      <div id="logo">
        <h1>S C O</h1>
        <h1>T U S</h1>
        <h1>N E T</h1>
      </div>
    </div>
    <div class="landing-right">
      <div class="particles">
        <!-- yellow: #f4c242 -->
        <vue-particles
          color="#f4c242"
          :particleOpacity="0.6"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="2"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="160"
          :moveSpeed="0.4"
          :hoverEffect="false"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="repulse">
        </vue-particles>
      </div>
      <img :src="'/static/img/SupremeCourtBlue.jpg'">
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      title: 'Landing.vue'
    }
  }
}
</script>

<style>

body {
  background: white;
}

div.landing {
  position: relative;
}

div.particles {
  height: 100%;
  width: 100%;
  position: absolute;
}

div.search {
  position: absolute;
  z-index: 1;
  padding-top: 23.5%;
  left: 40%;
  pointer-events: none;
}

input.landing-input {
  height: 8vh;
  width: 50vw;
  font-size: 40px;
  border-width: 0px;
  border-color: #333333;
  border-style: solid;
  padding-left: 30px;
  box-shadow: 1px 2px 25px #333333;
  pointer-events: all;
}

h1 {
  font-size: 100px;
  font-weight: 900;
  color: #333333;
}

#logo {
  position: absolute;
  padding-top: 50%;
  left: 30%;
}

img {
  object-position: 100% 0;
  max-height: 100%;
}

div.landing-left {
  width: 30%;
  padding: 0;
  margin: 0;
  float: left;
  height: 100vh;
  position: absolute;

}

div.landing-right {
  width: 70%;
  height: 100vh;
  background: rgba(44, 62, 80, 0.5);
  float: right;
}

</style>
