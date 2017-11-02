<template>
  <div class="w3-row-padding">


    <h3>Click on a list or click 'Clear Lists' to clear the lists!</h3>

    <!-- Render List.vue -->
    <app-list
    v-for="list in lists"
    key="listId"
    style="white-space: pre-wrap; text-align: left"
    @click.native="deleteList">{{ list }}</app-list>

  </div>
</template>

<script>
  import List from './List.vue';

  export default {
    props: ['lists'],

    data() {
      return {
        listsPresent: true
      }
    },

    methods: {
      deleteList(index) {
        this.$emit('listDeleted', index);
      }
    },

    components: {
      appList: List
    }
}
</script>

<style scoped>

</style>
