<template>
  <div id="app">
    <vue-c3 :handler="handler"></vue-c3>
    <vue-c3 :handler="barHandler"></vue-c3>
  </div>
</template>

<script>
import VueC3 from 'vue-c3'
import Vue from 'vue'

export default {
  name: 'app',
  data () {
    return {
      handler: new Vue(),
      barHandler: new Vue(),
      total: 0,
      dataSource: {
        data: {
          columns: [
            ['ranSys', 0],
            ['ranJs', 0]
          ],
        }
      },
      cumulative: {
        data: {
          columns: [
            ['total', 0],
          ],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5
          }
        }
      }
    }
  },
  components: {
    VueC3
  },
  mounted () {
    // Init the graph call
    this.handler.$emit('INIT', this.dataSource)
    this.barHandler.$emit('INIT', this.cumulative)
    // Call api every 1 sec
    setInterval(() => { this.load() }, 1000)
  },
  methods : {
    load () {
      this.$http.get('http://localhost:1337/random').then(response => {
        var data = response.body
        this.dataSource.data.columns[0].push(data.ranSys)
        this.dataSource.data.columns[1].push(data.ranJs)

        if (data.ranSys === data.ranJs) {
          this.cumulative.data.columns[0].push(++this.total);
        }

        this.handler.$emit('INIT', this.dataSource)
        this.barHandler.$emit('INIT', this.cumulative)
      }, response => {
        // error callback
      });
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
  margin-top: 60px;
}
</style>
