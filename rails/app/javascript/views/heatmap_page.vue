<template>
  <div id="app">
    {{ page_id }}
    {{ page_versions }}
    {{ page_views }}
    <p v-text="content"></p>
    <v-select :items="page_versions" item-text="id" item-value="id" @change="changeVersion" label="バージョン"></v-select>
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
      page_versions: [],
      page_views: []
    }
  },
  created: function(){
    axios.get(`/forcom/pages/${this.page_id}/page_versions`).then(resp=>{
      this.page_versions = resp.data.page_versions
    })
  },
  methods: {
    changeVersion: function (id) {
      console.log(id);
      axios.get(`/forcom/page_versions/${id}/page_views`).then(resp=>{
        console.log(resp);
        this.page_views = resp.data.page_views
      })
    }
  }
}

</script>

<style scoped>
</style>
