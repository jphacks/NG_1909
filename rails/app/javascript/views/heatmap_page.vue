<template>
  <div id="app">
    {{ page_id }}
    {{ page_versions }}
    <!-- {{ page_views }} -->
    <p v-text="content"></p>
    <v-select :items="page_versions" item-text="id" item-value="id" @change="changeVersion" label="バージョン"></v-select>
    <v-select :items="next_page_views" item-text="id" item-value="id" v-model="filter_next_page" label="フィルター"></v-select>
    <div id='heatMap'></div>
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

#heatMap {

width:1000px; height:1000px;
border:1px solid; background-color:yellow;
overflow:auto;
resize:both;

background-image:url(/captures/sample-lp2.jpg);
background-size: cover;
}

</style>

<script type="text/javascript">
import axios from 'axios'
import heatmapjs from 'heatmapjs'

export default {
  props: [
    'page_id'
  ],
  data: function(){
    return {
      content:'This is heatmapjs page',
      filter_next_page: null,
      page_versions: [],
      page_views: []
    }
  },
  created: function(){
    axios.get(`/forcom/pages/${this.page_id}/page_versions`).then(resp=>{
      this.page_versions = resp.data.page_versions
    })
  },
  computed: {
    next_page_views: function(){
      var npvs = []
      this.page_views.forEach(function(page_view){
        if (npvs.indexOf(page_view.next_page_view_id) < 0){ npvs.push(page_view.next_page_view_id) }
      })
      console.log("あああ");
      console.log(npvs);
      return npvs
    },
    display_page_views: function(){
      return this.page_views.filter(function(view){
        if ( this.filter_next_page == null ) { return true }
        return view.next_page_view_id == this.filter_next_page
      }.bind(this))
    },
    dots: function(){
      var data = []
      this.display_page_views.forEach(function(page_view){
        page_view.gazes.forEach(element => {
          var x=Math.round(element.x*1000);
          var y=Math.round(element.y*1000);
          data.push({x:x,y:y,value:1});
        });
      })
      return data
    }
  },
  methods: {
    changeVersion: function (id) {
      console.log(id);
      axios.get(`/forcom/page_versions/${id}/page_views`).then(resp=>{
        console.log(resp);
        this.page_views = resp.data.page_views
      })
    }
  },
  watch: {
    "dots": function(value){
      var heatmap = heatmapjs.create({
        container: document.getElementById("heatMap")
      })
      heatmap.setData({
        max: 1,
        data: value
      });
    }
  }
}

</script>

<style scoped>
</style>
