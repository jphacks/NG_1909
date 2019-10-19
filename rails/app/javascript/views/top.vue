<template>
  <div id="app">

    <div class="url-container">
      select your domains
      </select>
      <br>
        <v-btn class="url_buttons" v-for="domain in domains" @click="$router.push(`/domains/${domain.id}/transition`)">{{domain.all_domain}}</v-btn>
    </div>
  </div>
</template>

<style>
.url-container {
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.url_buttons {
  background: LightGray;
  border-radius: 4px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-weight: lighter;
}


</style>

<script type="text/javascript">

import axios from 'axios'

export default {
  data: function(){
    return {
      domains:[]
    }
  },
  created: function(){
    axios.get('/forcom/domains').then(resp=>{
      console.log(resp.data);
      this.domains = resp.data
    })
  }
}

</script>

<style scoped>
</style>
