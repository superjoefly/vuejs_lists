<template>
  <div class="w3-container animated lightSpeedIn w3-margin">
    <div
    class="w3-card-4 w3-round w3-pale-yellow w3-padding list-item"
    style="word-wrap: break-word"
    @mouseenter="show = !show" @mouseleave="show = !show">
    <i class="fa fa-close w3-right" style="margin: 5px" v-show="show"></i>
      <!-- Slot to output items -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style>
.list-item {
   background: url("http://i.stack.imgur.com/ynxjD.png") repeat-y;
   font-size: 18px;
   font-family: 'Gloria Hallelujah', cursive;
}

.list-item:hover {
  cursor: pointer;
  box-shadow: 2px 4px 4px #ffb7b9;
}
</style>
