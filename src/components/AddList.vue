<template>
  <div class="w3-container w3-light-grey">
    <p>Add some items to the textarea and click the 'Create List' button to add a list!</p>

    <input class="w3-input animated jello" v-model="item" placeholder="1. Learn Vue.js!..." @keyup.enter="addItem"></input>

    <div class="w3-container w3-margin">

      <button class="w3-button w3-blue w3-round" @click="addItem">Add</button>

      <button class="w3-button w3-yellow w3-round" @click="clearItems">Clear</button>

      <button class="w3-button w3-green w3-round" @click="saveList"
      >Save</button>

      <button class="w3-button w3-orange w3-round"
      @click="getList">Load</button>

      <p class="w3-text-green">Don't forget to save your list!</p>

      <div class="w3-panel w3-pale-green w3-large message" v-if="saved">
        <p>{{message}}</p>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    props: ['list'],

    data() {
      return {
      item: '',
      message: '',
      saved: false
    }
  },

    methods: {
      addItem() {
        if(this.item == '') {
          event.preventDefault();
        } else {
          this.$emit('itemAdded', this.item);
          this.item = '';
        }
      },

      clearItems() {
        this.$emit('itemsCleared');
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
      }
    },

    // Overwrite dbLists with empty lists to clear database
    // created() {
    //   this.saveLists();
    // }
  }
</script>

<style scoped>

.w3-button {
  margin: 5px;
}

.message {
  position: absolute;
  right: 20px;
  top: 50px;
  z-index: 10;
  width: 50%;
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
