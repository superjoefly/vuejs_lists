<template>
  <div>

    <!-- Transition Group (Unordered List) -->
    <app-list>
      <!-- Slotted Content (List Items) -->
      <li v-for="(item, index) in list"
      key="item"
      v-bind:data-index="index"
      style="white-space: pre-wrap; text-align: left; position: relative;" @click="markCompleted(index)">

        <span :class="{'marked': item.completed}">{{index + 1}} : {{ item.name }}</span>

        <i class="fa fa-close" @click.stop="deleteItem(index)"></i>
      </li>
    </app-list>

  </div>
</template>

<script>
  import List from './List.vue';

  export default {
    props: ['list'],

    components: {
      appList: List
    },

    methods: {
      deleteItem(index) {
        this.$emit('itemDeleted', index);
      },
      markCompleted(index) {
        let item = this.list[index];
        item.completed = !item.completed;
      }
    }
}
</script>

<style scoped>
/*.icon-container {
  position: relative;
}

.fa-close {
  position: absolute;
  right: 10px;
  top: 13px;
  cursor: pointer;
}

.fa-close:hover {
  color: red;
}

.marked {
  text-decoration: line-through;
}

span:hover {
  cursor: pointer;
  color: white;
}*/

</style>
