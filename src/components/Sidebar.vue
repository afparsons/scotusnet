<template lang="html">
  <div class='panel'>
    <!-- <sui-segment> -->
    <div id='heading'>
      <h1 is="sui-header">S C O T U S N E T</h1>
      <sui-message class="message" info style="text-align:center" v-show="currentQueryCaseName">
        <sui-message-header>{{currentQueryCaseName}}</sui-message-header>
        <p>
          Currently displayed query
        </p>
      </sui-message>
      <sui-message class="message" warning style="text-align:left" icon="question" v-show="queryNotFound">
        <sui-message-header>Hmm... nothing found for <i>{{query}}</i></sui-message-header>
        <p>
          Please be aware that case names must be properly spelled, capitalized, and spaced.
        </p>
      </sui-message>
    </div>
    <sui-divider />
    <div class='search'>
      <sui-input attached="top" style="width:100%" icon="search" placeholder="Search..." v-model="query" @click="queryNotFound=false" v-on:keyup.enter="searchAndDisplayGraph()"/>
    </div>
    <sui-divider />

    <!-- <div class="search-buttons" style="width:100%">
      <sui-button basic active="false" size="small" content="ID"/>
      <sui-button basic active="true" size="small" content="Case Name"/>
      <sui-button basic size="small" content="Keyword"/>
      <sui-button basic size="small" content="USR Citation"/>
    </div> -->
    <!-- <div v-show="currentQueryCaseName"> -->
    <div v-show="selectedCaseName">
      <sui-card class="case-card" style="width:100%">
        <sui-card-content>
          <sui-card-header class='card-header'>
            {{selectedCaseName}}
          </sui-card-header>
        </sui-card-content>
        <sui-card-content>
          <table>
            <tr>
              <th>
                <sui-label color='teal'>Votes: 5-4</sui-label>
              </th>
              <th>
                <sui-label color='yellow'>Cited: 23</sui-label>
              </th>
              <th>
                <sui-label color='orange'>Citing: 78</sui-label>
              </th>
              <th>
                <sui-label color='blue'>Date: 1970-10-07</sui-label>
              </th>
            </tr>
          </table>
          <div id="showHideButtons" is="sui-button-group">
            <sui-button v-on:click="emit_degreeExpansion()">Show This Case's Citations</sui-button>
            <sui-button-or/>
            <sui-button v-on:click="emit_degreeContraction()">Hide This Case's Citations</sui-button>
          </div>
          <sui-divider />
          <sui-card-content style="text-align:left">
            <table>
              <tr>
                <th>
                  <sui-header size="tiny">ORIGIN</sui-header>
                </th>
                <th>
                  <sui-header size="tiny">PARTIES</sui-header>
                </th>
                <th>
                  <sui-header size="tiny">REPRESENTATION</sui-header>
                </th>
              </tr>
              <tr>
                <th>
                  <div class="ui small feed">
                    <div class="details">
                      <p>Plaintiff</p>
                    </div>
                    <div class="details">
                      <p>Defense</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="ui small feed">
                    <div class="details">
                      <p>Plaintiff</p>
                    </div>
                    <div class="details">
                      <p>Defense</p>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="ui small feed">
                    <div class="details">
                      <p>Plaintiff</p>
                    </div>
                    <div class="details">
                      <p>Defense</p>
                    </div>
                  </div>
                </th>
              </tr>
            </table>
          </sui-card-content>
          <sui-divider />
          <sui-menu :widths="3">
            <sui-menu-item><a>{{usrCitation}}</a></sui-menu-item>
            <sui-menu-item><a>50 S. Ct. 273 </a></sui-menu-item>
            <sui-menu-item>Lexis</sui-menu-item>
          </sui-menu>
        <!-- <sui-card-content> -->
          <!-- <sui-message positive dismissable>
            <p style="display:inline; text-align:left">Copied to clipboard!</p>
            <p style="display:inline; text-align:right; font-weight:bold">{{usrCitation}}</p>
          </sui-message> -->
          <!-- <sui-menu :widths="3">
            <sui-menu-item><a>{{usrCitation}}</a></sui-menu-item>
            <sui-menu-item><a>50 S. Ct. 273 </a></sui-menu-item>
            <sui-menu-item>Lexis</sui-menu-item>
          </sui-menu>
        </sui-card-content> -->
          <sui-menu pointing secondary attached="top" :widths="3">
            <a
              is="sui-menu-item"
              v-for="item in items"
              :active="isActive(item)"
              :key="item"
              :content="item"
              @click="select(item)"
            />
          </sui-menu>
          <sui-segment attached="bottom">
            <p style="text-align:left">Justice Anthony Scalia</p>
          </sui-segment>
        </sui-card-content>
        <!-- <sui-tab :menu="{ pointing: true }">
          <sui-tab-pane title="Circle" :attached="false">Majority</sui-tab-pane>
          <sui-tab-pane title="Box" :attached="false">Concuring</sui-tab-pane>
          <sui-tab-pane title="Triangle" :attached="!false">Dissenting</sui-tab-pane>
        </sui-tab> -->
        <sui-card-content extra>
          <sui-button size='tiny' @click='thirdPartySearch(0)'>CourtListener</sui-button>
          <sui-button size='tiny' @click='thirdPartySearch(1)'>Oyez</sui-button>
          <sui-button size='tiny' @click='thirdPartySearch(2)'>ILL</sui-button>
          <sui-button size='tiny' @click='thirdPartySearch(3)'>Justia</sui-button>
          <sui-button size='tiny' @click='thirdPartySearch(4)'>Quimbee</sui-button>
        </sui-card-content>
        <sui-card-content extra id="meta">
          <table>
            <tr>
              <th>
                <p class="meta-label">SCDB ID:</p>
                <p class="meta-content">Null</p>
              </th>
              <th>
                <p class="meta-label">Court Listener:</p>
                <p class="meta-content">{{courtListenerID}}</p>
              </th>
            </tr>
          </table>
        </sui-card-content>
      </sui-card>
      <sui-divider />
    </div>
    <div class="options-div">
      <h4 is="sui-header">Options</h4>
      <table class="options">
        <tr>
          <th>
            <sui-dropdown placeholder="Date Format" selection/>
          </th>
          <th>
            <sui-checkbox class="checkbox-options" label="Case Name"/>
            <sui-checkbox class="checkbox-options" label="Short Name"/>
          </th>
          <th>
            <sui-checkbox class="checkbox-options" label="USR Citation"/>
            <sui-checkbox class="checkbox-options" label="Opinion ID"/>
          </th>
        </tr>
      </table>
    </div>
    <sui-divider />
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  // see if there is a better solution to this mega-pass!
  props: [
    //   'query',
    //   'queryNotFound',
    'currentQueryCaseName',
    'selectedCaseName',
    'usrCitation',
    //   'neo4jID',
    'courtListenerID'
  ],
  data () {
    return {
      query: '',
      queryNotFound: false,
      active: 'Majority',
      items: ['Majority', 'Concurring', 'Dissenting'],

      // Neo4j
      protocol: 'bolt',
      host: 'localhost',
      port: 7687,
      username: 'vue',
      password: 'RedWatermelon!vue',
      // fix encryption!
      encrypted: false

      // Node info
      // currentQueryCaseName: '',
      // usrCitation: ''
    }
  },
  methods: {
    isActive (name) {
      return this.active === name
    },
    select (name) {
      this.active = name
    },
    cleanQuery (query) {
      var cleanedQuery = query.trim()
      return cleanedQuery
    },
    buildNodesArray (records) {
      var nodesArray = []
      nodesArray.push({
        id: records[0]._fields[0].properties.id,
        name: records[0]._fields[0].properties.name,
        _color: '#FFD700'
      })
      for (var i = 0, len = records.length; i < len; i++) {
        nodesArray.push({
          id: records[i]._fields[1].properties.id,
          name: records[i]._fields[1].properties.name,
          usrCitation: records[i]._fields[1].properties.usr_citation
        })
      }
      return nodesArray
    },
    buildLinksArray (records) {
      var linksArray = []
      for (var i = 0, len = records.length; i < len; i++) {
        linksArray.push({
          sid: records[i]._fields[0].properties.id,
          tid: records[i]._fields[1].properties.id
        })
      }
      return linksArray
    },
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
    getNodePropertiesByID (id) {
      const session = this.$neo4j.getSession()
      var cypher = 'MATCH (n) WHERE (n.id="' + id + '") RETURN (n)'
      session.run(cypher)
        .then(res => {
          var obj = {
            name: res.records[0]._fields[0].properties.name,
            name_short: res.records[0]._fields[0].properties.name_short,
            courtListenerID: id,
            usrCitation: res.records[0]._fields[0].properties.usr_citation
          }
          console.log(obj)
          return obj
        })
        .then(() => {
          session.close()
        })
    },
    searchAndDisplayGraph () {
      // Get a session from the driver
      const session = this.$neo4j.getSession()
      this.query = this.cleanQuery(this.query)
      var cypher = 'MATCH (n {name:"' + this.query + '"})-[*]-(connected) RETURN n, connected'
      session.run(cypher)
        .then(res => {
          if (res.records[0] === undefined) {
            this.queryNotFound = true
          }
          this.$emit('graph', {
            nodes: this.buildNodesArray(res.records),
            links: this.buildLinksArray(res.records),
            name: res.records[0]._fields[0].properties.name,
            courtListenerID: res.records[0]._fields[0].properties.id,
            usrCitation: res.records[0]._fields[0].properties.usr_citation
          })
          // this.currentQueryCaseName = res.records[0]._fields[0].properties.name
          // this.selectedCaseName = res.records[0]._fields[0].properties.name
          // this.usrCitation = res.records[0]._fields[0].properties.usr_citation
        })
        .then(() => {
          session.close()
        })
    },
    emit_degreeExpansion () {
      this.$emit('degreeExpansion', this.courtListenerID)
    },
    emit_degreeContraction () {
      this.$emit('degreeContraction', this.courtListenerID)
    },
    thirdPartySearch (site) {
      switch (site) {
        case 0:
          // fix this with cluster id!
          window.open('https://www.courtlistener.com/?q=' + this.selectedCaseName, '_blank')
          break
        case 1:
          window.open('https://www.oyez.org/search/' + this.selectedCaseName, '_blank')
          break
        case 2:
          window.open('https://www.law.cornell.edu/search/site/' + this.selectedCaseName, '_blank')
          break
        case 3:
          window.open('https://www.justia.com/search?q=' + this.selectedCaseName, '_blank')
          break
        case 4:
          window.open('https://www.quimbee.com/search?q=' + this.selectedCaseName, '_blank')
          break
      }
    }
  },
  created () {
    this.connect()
  }
}
</script>

<style>

div.panel {
  position: relative;
}

div.message {
  text-align: left;
}

.details {
  font-weight: lighter;
}

h4 {
  text-align: left;
}

table.details-table {
  width: 100%;
}

#showHideButtons {
  padding-top: 10px;
}

table.options {
  text-align: left;
  font-weight: normal;
}

.case-card {
  position: absolute;
  bottom: 0;
}

div.card-header {
  text-align: center;
}

div.search-buttons {
  padding-bottom: 10px;
}

table {
  width: 100%;
}

p.meta-label {
  user-select: none;
  display: inline-block;
  font-weight: lighter;
  padding-right: 3%;
}

p.meta-content {
  display: inline-block;
  font-weight: lighter;
}

</style>
