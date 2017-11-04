<template>
  <div class="w3-light-grey" style="height: 100%;">

    <!-- Render Clock Component -->
    <app-clock></app-clock>

    <input class="w3-input animated jello" v-model="item.name" placeholder="1. Learn Vue.js!..." @keyup.enter="addItem" @focus="clearError"></input>

    <div class="w3-grey w3-bar" style="width: 100%;">
      <button class="w3-button w3-blue" @click="addItem">Add</button>

      <button class="w3-button w3-green" @click="saveList"
      >Save</button>

      <button class="w3-button w3-yellow" @click="clearItems">Clear</button>

      <button class="w3-button w3-orange"
      @click="getList">Load</button>
    </div>

    <div class="w3-container">

      <button class="w3-button w3-left w3-hover-teal" @click="showCompleted">Completed</button>
      <button class="w3-button w3-right w3-hover-teal">Incomplete</button>

      <br><br />

      <p class="w3-text-green">Don't forget to save your list!</p>

      <div class="w3-panel w3-green w3-large message" v-if="saved">
        <p>{{message}}</p>
      </div>

      <p v-if="error" class="w3-text-red w3-small">{{error}}</p>

      <!-- Render ListGrid.vue -->
      <app-list-grid
      :list="itemList"
      @itemCompleted="markItem"
      @itemDeleted="removeItem"
      ></app-list-grid>

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
      saved: false,
      error: ''
    }
  },

    computed: {
      itemList() {
        return this.list;
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
          vm.saved = false;
        }, 3000)
      },

      saveList() {
        this.message = 'List Saved!';
        this.saved = true;
        const data = {
          dbList: this.list
        };
        this.$http.put('data.json', data);
        this.hideMessage();
      },

      getList() {
        this.$http.get('data.json')
        .then(response => {
          return response.json();
        })

        .then(data => {
            const resultArray = data.dbList;
            this.$emit('listUploaded', resultArray);
        })

        .catch(error => {
          this.error = 'No Items In List!';
        })
      },


      removeItem(index) {
        this.list.splice(index, 1);
      },
      markItem(index) {
        console.log('Marked!');
        console.log(this.list[index]);
      },

      showCompleted() {
        //
      }
    },

    // Overwrite dbLists with empty lists to clear database
    // created() {
    //   this.saveList();
    // }
  }
</script>

<style scoped>

.message {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  width: 50%;
  transform: translate(-50%, -50%);
  animation: flash-message 3s forwards;
}

@keyframes flash-message {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0; display: none;
  }
}

</style>
