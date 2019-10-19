<template>
  <v-app>
    <div id="app">
      <header-component />
        <v-content>
          <!-- Provides the application the proper gutter -->
          <v-container fluid>
            <!-- If using vue-router -->
              <router-view />
          </v-container>
      </v-content>
      <footer-component />
    </div>
  </v-app>
</template>

<script>
import HeaderComponent from 'shared/header';
import FooterComponent from 'shared/footer';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  }
}
</script>

<style>
.marginTop9 {
  margin-top: 90px
}
</style>
