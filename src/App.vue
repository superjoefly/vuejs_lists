<template>
  <div class="w3-container w3-center w3-dark-grey" style="height: 100%;">

    <h3>Todo List App</h3>

    <!-- Render AddList.vue -->
    <app-add-list
    @listAdded="addLists"
    @listRemoved="removeList"
    @listsCleared="removeLists"
    :lists="lists"

    @listsUploaded="loadLists"
    ></app-add-list>

    <!-- Render ListGrid.vue -->
    <app-list-grid
    :lists="lists"
    @listDeleted="removeList"
    ></app-list-grid>

    <app-clock></app-clock>

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
        lists: []
      }
    },

    methods: {
      addLists(list) {
        this.lists.push(list);
      },
      removeList(index) {
        this.lists.splice(index, 1);
      },
      loadLists(resultArray) {
        this.lists = resultArray;
      },
      removeLists() {
        this.lists = [];
      }
    }

  }
</script>
