<template>
  <div id="app">
    <div class="url-container">
      select your domains
      </select>
      <br>
        <button class="url_buttons" v-for="todo in items">{{todo}}</button>
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

export default {
  data: function(){
    return {
      content:'add your urls here:',
      item:'',
      items:["aa", "bb", "cc", "nn"]
    }
  }
}

</script>

<style scoped>
</style>
