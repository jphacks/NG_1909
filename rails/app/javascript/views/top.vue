<template>
  <div id="app">
    <div class="url-container">
      <button class="url_click" v-for="todo in items[0]"@click>{{todo}}</button>
      <br>
      <input class="url_input" type="texxt" v-model ='item'>
      <br>
      <button class="url_buttons" @click="items.push(item)">Add url above</button>
    </div>
  </div>
</template>

<style>
.url-container {
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.url_click{
  background: LightGray;
  margin-right: 20px;
  margin-bottom: 7px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.url_buttons {
  background: LightGray;
  border-radius: 4px;
}

.url_input{
  border: solid gray 2px;
  margin-bottom: 10px;
}
</style>

<script type="text/javascript">

export default {
  data: function(){
    return {
      content:'add your urls here:',
      item:'',
      items:[["aa", "bb", "cc"]]
    }
  }
}

</script>

<style scoped>
</style>
