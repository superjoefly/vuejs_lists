<template>
  <div>

    <!-- Render Clock Component -->
    <app-clock></app-clock>

    <input class="w3-input" v-model="item.name" placeholder="Today, I'm going to..." @keyup.enter="addItem" @focus="clearError" autofocus></input>

    <div class="w3-grey w3-bar" style="width: 100%;">
      <button class="w3-blue w3-button buttons" @click="addItem">Add</button>

      <button class="w3-yellow w3-button buttons" @click="clearItems">Clear</button>

      <button class="w3-orange w3-button buttons"
      @click="getList">Load</button>
    </div>

    <div>
      <button class="w3-button w3-left w3-text-blue my-button" @click="getCompleted">Completed</button>
      <button class="w3-button w3-right w3-text-blue my-button" @click="clearCompleted">Clear Completed</button>

      <br><br />

      <p class="w3-text-green save-note">Don't forget to save your list!</p>

      <button class="w3-button w3-pale-green w3-block save-button" @click="saveList"
      >Save List</button>

      <br><br>

      <div class="w3-panel w3-green w3-large message" v-if="showMessage">
        <p>{{message}}</p>
      </div>

      <p v-if="error" class="w3-text-red w3-small">{{error}}</p>

      <!-- Render ListGrid.vue -->
      <app-list-grid
      :list="list"
      @itemDeleted="removeItem"
      ></app-list-grid>

      <button class="w3-button w3-bottom w3-pale-blue w3-block save-button" @click="clearStorage"
      >Clear Storage</button>

    </div>

  </div>
</template>

<script>
  import Clock from './Clock.vue';
  import ListGrid from './ListGrid.vue';

  export default {
    components: {
      appClock: Clock,
      appListGrid: ListGrid
    },
    props: ['list'],

    data() {
      return {
        item: {
          name: '',
          completed: false
        },
        message: '',
        error: '',
        showMessage: false
      }
    },

    computed: {
      completed() {
        return this.list.filter(item => item.completed);
      }
    },

    methods: {
      reset() {
        this.item = {
          name: '',
          completed: false
        }
      },

      clearError() {
        this.error = '';
      },

      addItem() {
        if(this.item.name == '') {
          event.preventDefault();
        } else {
          let item = this.item;
          this.$emit('itemAdded', item);
          this.reset();
          this.clearError();
        }
      },

      clearItems() {
        this.$emit('itemsCleared');
        this.clearError();
      },

      hideMessage() {
        var vm = this;
        setTimeout(function() {
          vm.showMessage = false;
        }, 3000)
      },

      saveList() {
        localStorage.setItem('storedList', JSON.stringify(this.list));

        this.message = 'List Saved!';
        this.showMessage = true;
        this.hideMessage();
        this.clearError();
      },
      getList() {
        let savedList = localStorage.getItem('storedList');

        if (savedList == null || savedList == '[]') {
          this.error = 'No Items in Storage';
        } else {
          let listItems = JSON.parse(localStorage.getItem('storedList'));
          this.$emit('updateList', listItems);
        }
      },

      clearStorage() {
        localStorage.clear();
        this.message = 'Storage Cleared!';
        this.showMessage = true;
        this.hideMessage();
        this.clearError();
      },


      removeItem(index) {
        this.list.splice(index, 1);
      },

      getCompleted() {
        this.$emit('showCompleted', this.completed);
      },
      clearCompleted() {
        this.$emit('clearCompleted', this.completed);
      }
    }
  }
</script>
