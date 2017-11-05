<template>
  <div class="w3-light-grey" style="height: 100vh;">

    <!-- Render Clock Component -->
    <app-clock></app-clock>

    <input class="w3-input animated jello" v-model="item.name" placeholder="Today I'm going to..." @keyup.enter="addItem" @focus="clearError"></input>

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

      <p class="w3-text-green">Don't forget to save your list!</p>

      <button class="w3-button w3-green w3-block save" @click="saveList"
      >Save</button>

      <br><br>

      <div class="w3-panel w3-green w3-large message" v-if="saved">
        <p>{{message}}</p>
      </div>

      <p v-if="error" class="w3-text-red w3-small">{{error}}</p>

      <!-- Render ListGrid.vue -->
      <app-list-grid
      :list="list"
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
        error: '',
        saved: false
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
        this.clearError();
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
          if(this.list.length == 0) {
            this.error = 'No Items In List!';
          }
        })
      },


      removeItem(index) {
        this.list.splice(index, 1);
      },
      markItem(index) {
        console.log('Marked!');
        console.log(this.list[index]);
      },

      getCompleted() {
        this.$emit('showCompleted', this.completed);
      },

      clearCompleted() {
        this.$emit('clearCompleted', this.completed);
      }
    },

    // For demo purposes
    created() {
      this.saveList();
      this.getList();
    }
  }
</script>

<style scoped>

/*.message {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  width: 50%;
  transform: translate(-50%, 20%);
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

.w3-input {
  border: none;
}

.buttons {
  width: 33.33%;
  float: left;
}

.my-button:hover {
  background-color: transparent !important;
  color: orange !important;
}*/

</style>
