<template>
  <div class="w3-container w3-third animated lightSpeedIn">
    <div
    class="w3-panel w3-card-4 w3-round w3-pale-yellow"
    style="word-wrap: break-word"
    @mouseenter="show = !show" @mouseleave="show = !show">
    <i class="fa fa-close w3-right" style="margin: 5px" v-show="show"></i>
      <!-- Slot to output lists -->
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
.w3-panel {
   background: url("http://i.stack.imgur.com/ynxjD.png") repeat-y;
   font-size: 18px;
   font-family: 'Gloria Hallelujah', cursive;
}

.w3-panel:hover {
  cursor: pointer;
  box-shadow: 2px 4px 4px #ffb7b9;
}
</style>
