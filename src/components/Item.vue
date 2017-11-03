<template>
  <div class="w3-container animated lightSpeedIn w3-margin">
    <div
    class="w3-card-4 w3-round w3-pale-yellow list-item"
    style="word-wrap: break-word">
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
</style>
