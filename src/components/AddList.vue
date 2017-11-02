<template>
  <div class="w3-container w3-light-grey">
    <p>Add some items to the textarea and click the 'Create List' button to add a list!</p>

    <textarea rows="5" cols="50" class="w3-card-4 animated jello" v-model="list" placeholder="1. Learn Vue.js!..."></textarea>

    <div class="w3-container w3-margin">

      <button class="w3-button w3-blue w3-round" @click="addList">Create List</button>

      <button class="w3-button w3-green w3-round" @click="saveLists"
      >Save Lists</button>

      <button class="w3-button w3-yellow w3-round" @click="clearLists">Clear Lists</button>

      <button class="w3-button w3-orange w3-round"
      @click="getLists">Load Lists</button>

    </div>


  </div>
</template>

<script>
  export default {
    props: ['lists'],

    data() {
      return {
      list: ''
    }
  },

    methods: {
      addList() {
        if(this.list == '') {
          event.preventDefault();
        } else {
          this.$emit('listAdded', this.list);
          this.list = '';
        }
      },

      clearLists() {
        this.$emit('listsCleared');
      },

      saveLists() {
        const data = {
          dbLists: this.lists
        };
        this.$http.put('data.json', data);
      },

      // Using Post with Get Overwrites the data and only returns the last object.

      // getLists() {
      //   this.$http.get('data.json').then(response => {
      //     return response.json();
      //   })
      //
      //   .then(data => {
      //     for (let key in data) {
      //     const resultArray = data[key].dbLists;
      //     this.$emit('listsUploaded', resultArray);
      //   }
      //
      //   })
      // }


      getLists() {
        this.$http.get('data.json')
        .then(response => {
          return response.json();
        })

        .then(data => {
          const resultArray = data.dbLists;
          this.$emit('listsUploaded', resultArray);
        })
      }
    },

    created() {
      this.saveLists();
    }
  }
</script>

<style scoped>

textarea {
  background: url("http://i.stack.imgur.com/ynxjD.png") repeat-y;
  font-size: 18px;
  font-family: 'Gloria Hallelujah', cursive;
  width: 100%;
}

@media all and (min-width: 800px) {
  textarea {
    width: 50%;
  }
}

.w3-button {
  margin: 5px;
}

</style>
