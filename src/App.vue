<template>

  <div class="w3-center" style="margin-top: 38px;">

    <app-add-list
    @itemAdded="addItem"
    @itemsCleared="removeItems"
    @updateList="updateList"
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
      updateList(listItems) {
        this.list = listItems;
      },
      showCompleted(completed) {
        this.list = completed;
      },
      clearCompleted() {
        this.list = this.list.filter(item => !item.completed);
      }
    },

    // Use localStorage for persistance
    mounted() {
      localStorage.setItem('storedList', JSON.stringify([
        {name: 'Go to the store.', completed: true},
        {name: 'Walk the dog.', completed: false}
      ]));

      let storageList = JSON.parse(localStorage.getItem('storedList'));

      this.list = storageList;

      // localStorage.clear();
    }

  }
</script>
