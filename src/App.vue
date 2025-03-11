<template>
  <div id="app">
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from './components/ProductList.vue';

export default defineComponent({
  name: 'App',
  components: { ProductList },
  setup() {
    return {};
  }
});
</script>

<style>
body {
  margin: 0;
  background-color: #4dd0e1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #777;
  margin: 20px auto;
  max-width: 600px;
  padding: 10px;
}
</style>