<template>
  <div id="app">
    {{ domain_id }}
    {{ page_views }}
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
    "domain_id"
  ],
  data: function(){
    return {
      content:'View transition here',
      item:'',
      itemss:[[{path: "aa", height: 50}, {path: "bb", height: 10}, {path: "cc", height: 10}], [{path: "dd", height: 10}, {path: "ee", height: 15}, {path: "vv", height: 10}],[{path: "dd", height: 10}, {path: "ee", height: 10}, {path: "vv", height: 0}],[{path: "tt", height: 10}, {path: "pp", height: 0}], [{path: "rr", height: 0}]],
      page_views: []
    }
  },
  created: function(){
    axios.get(`/forcom/domains/${this.domain_id}/page_views`).then(resp=>{
      console.log(resp.data);
      this.page_views = resp.data.page_views
    })
  }
}

</script>

<style scoped>
</style>
