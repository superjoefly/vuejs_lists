<template>
  <div class="w3-container w3-center w3-dark-grey w3-padding container" style="height: 100vh;">

    <app-add-list
    @itemAdded="addItem"
    @itemsCleared="removeItems"
    @listUploaded="showList"
    @showCompleted="showCompleted"
    @clearCompleted="clearCompleted"
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
        list: [
          {name: 'Go to the store.', completed: true},
          {name: 'Walk the dog.', completed: false}
        ]
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
      },
      showCompleted(completed) {
        this.list = completed;
      },
      clearCompleted() {
        this.list = this.list.filter(item => !item.completed);
      }
    }

  }
</script>
