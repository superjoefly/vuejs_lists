<template>
  <!-- Transition-Group - Wrapper for Items -->
  <transition-group
    tag="ul"
    @before-enter="beforeEnter"
    @enter="enter"
    :css="false"
    class="w3-round w3-ul w3-hoverable list"
  >
    <!-- Slot for List-Items -->
    <slot></slot>
  </transition-group>


</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },

    methods: {
      /*Velocity Animations*/
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el,done) {
        var delay = el.dataset.index * 150;
        setTimeout(function() {
          Velocity(el, 'transition.bounceRightIn');
        }, delay)
      }
    }
  }
</script>

<style>
.list {
   /*background: url("http://i.stack.imgur.com/ynxjD.png") repeat-y;*/
   font-size: 18px;
   font-family: 'Gloria Hallelujah', cursive;
   word-wrap: break-word;
   list-style-type: none;
   margin: 0;
   padding: 0;
}
</style>
