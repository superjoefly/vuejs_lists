<template>
  <div class="w3-container">


    <h3>Click on an item to delete or click "Clear" to clear the list!</h3>

    <!-- Render List.vue -->
    <!-- <app-list
    v-for="(item, index) in list"
    key="itemId"
    style="white-space: pre-wrap; text-align: left"
    @click.native="deleteItem">{{index + 1}} : {{ item }}</app-list> -->

    <app-item
    v-for="(item, index) in list"
    key="itemId"
    style="white-space: pre-wrap; text-align: left; position: relative;" @click.native="markCompleted($event, index)" >

      <span id="item" class="item">{{index + 1}} : {{ item.name }}</span>

      <!-- <i class="fa fa-close" @click="deleteItem(index)"></i> -->

    </app-item>

  </div>
</template>

<script>
  import Item from './Item.vue';

  export default {
    props: ['list'],

    methods: {
      deleteItem(index) {
        this.$emit('itemDeleted', index);
      },
      markCompleted(event, index) {
        let item = this.list[index];
        if(item.completed === false) {
          item.completed = true;
        } else {
          item.completed = false;
        }
        console.log(item);
        event.target.children[0].classList.toggle('marked');

        // this.$emit('itemCompleted', index);
      }
    },

    components: {
      appItem: Item
    }
}
</script>

<style scoped>
.icon-container {
  position: relative;
}
.fa-close {
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
}

.fa-close:hover {
  color: red;
}

.marked {
  text-decoration: line-through;
}
</style>
