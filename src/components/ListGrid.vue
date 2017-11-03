<template>
  <div class="w3-container">


    <h3>Click on an item to delete or click "Clear" to clear the list!</h3>

    <!-- Render List.vue -->
    <app-list
    v-for="(item, index) in list"
    key="itemId"
    style="white-space: pre-wrap; text-align: left"
    @click.native="deleteItem">{{index + 1}} : {{ item }}</app-list>

  </div>
</template>

<script>
  import List from './List.vue';

  export default {
    props: ['list'],

    data() {
      return {
        // listsPresent: true
      }
    },

    methods: {
      deleteItem(index) {
        this.$emit('itemDeleted', index);
      }
    },

    components: {
      appList: List
    }
}
</script>

<style scoped>

</style>
