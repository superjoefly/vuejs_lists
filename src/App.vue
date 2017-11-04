<template>
  <div class="w3-container w3-center w3-dark-grey w3-padding" style="height: 100vh;">

    <app-add-list
    @itemAdded="addItem"
    @itemsCleared="removeItems"
    @listUploaded="showList"
    :list="list"
    ></app-add-list>

  </div>
</template>

<script>
  import AddList from './components/AddList.vue';

  export default {
    
    components: {
      appAddList: AddList
    },

    data() {
      return {
        list: []
      }
    },

    methods: {
      addItem(item) {
        this.list.push(item);
      },
      removeItems() {
        this.list = [];
      },
      showList(resultArray) {
        this.list = resultArray;
      }
    }

  }
</script>
