<template>
  <div id="app">
    {{ page_id }}
    {{ page_versions }}
    <p v-text="content"></p>
    <div class="flex-row">
        <div class="flex-column" v-for="items in itemss">
            <div v-for="item in items">
                <v-btn>{{item.path}}</v-btn>
                <svg width="40" height="20">

                <rect width="40" :height="item.height" style="fill:rgb(100,30,255);"/>
              </svg>
            </div>
        </div>
    </div>
</div>
</template>

<style>

.flex-row {
    display: flex;
    flex-direction: row;
}
.flex-column {
    display: flex;
    flex-direction: column;
}

</style>

<script type="text/javascript">
import axios from 'axios'

export default {
  props: [
    'page_id'
  ],
  data: function(){
    return {
      content:'This is heatmap page',
      item:'',
      itemss:[[{path: "aa", height: 50}, {path: "bb", height: 10}, {path: "cc", height: 10}], [{path: "dd", height: 10}, {path: "ee", height: 15}, {path: "vv", height: 10}],[{path: "dd", height: 10}, {path: "ee", height: 10}, {path: "vv", height: 0}],[{path: "tt", height: 10}, {path: "pp", height: 10}], [{path: "rr", height: 10}]],
      page_versions: []
    }
  },
  created: function(){
    axios.get(`/forcom/pages/${this.page_id}/page_versions`).then(resp=>{
      this.page_versions = resp.data.page_versions
    })
  }
}

</script>

<style scoped>
</style>
