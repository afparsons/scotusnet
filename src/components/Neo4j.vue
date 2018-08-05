<template>
  <div id="neo">
    <input v-model="query" placeholder="Enter Case Short Name">
    <button @click="connect()">Connect</button>
    <button @click="driver()">Driver</button>
    <button @click="testQuery()">Test</button>
    <p>Query: {{query}}</p>
  </div>
</template>

<script>
export default {
  name: 'neo4j',
  data () {
    return {
      query: '',
      protocol: 'bolt',
      host: 'localhost',
      port: 7687,
      username: 'vue',
      password: 'RedWatermelon!vue',
      encrypted: false
    }
  },
  methods: {
    connect () {
      var r = this.$neo4j.connect(this.protocol, this.host, this.port, this.username, this.password, this.encrypted)
      console.log(r)
      return r
    },
    driver () {
      // Get a driver instance
      var r = this.$neo4j.getDriver()
      console.log(r)
      return r
    },
    testQuery () {
      // Get a session from the driver
      const session = this.$neo4j.getSession()
      console.log('SESSION: ' + session.toString())
      var cypher = 'MATCH (n) WHERE (n.name_short="' + this.query + '") RETURN (n)'
      session.run(cypher)
        .then(res => {
          console.log(res)
        })
        .then(() => {
          session.close()
        })
    }
  }
}
</script>
