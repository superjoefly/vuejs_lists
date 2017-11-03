<template>
  <div class="w3-container w3-center w3-dark-grey" style="height: 100%;">

    <app-clock></app-clock>

    <app-add-list
    @itemAdded="addTodoItem"
    @itemsCleared="removeItems"
    @listUploaded="showList"
    :list="list"
    ></app-add-list>


    <!-- Render ListGrid.vue -->
    <app-list-grid
    :list="list"
    @itemDeleted="removeItem"
    ></app-list-grid>

  </div>
</template>

<script>
  import ListGrid from './components/ListGrid.vue';
  import AddList from './components/AddList.vue';
  import Clock from './components/Clock.vue';

  export default {

    components: {
      appListGrid: ListGrid,
      appAddList: AddList,
      appClock: Clock
    },

    data() {
      return {
        list: []
      }
    },

    methods: {
      addTodoItem(item) {
        this.list.push(item);
      },
      removeItems() {
        this.list = [];
      },
      removeItem(index) {
        this.list.splice(index, 1);
      },
      showList(resultArray) {
        this.list = resultArray;
      }
    }

  }
</script>
