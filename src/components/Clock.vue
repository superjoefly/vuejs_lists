<template>

  <div class="w3-text-blue">
    <button class="w3-button w3-left">Light</button>
      <span id="date" class="clock"></span>
      <span id="timeclock" class="clock"></span>
    <button class="w3-button w3-right">Dark</button>
  </div>


</template>

<script>
  export default {
    methods: {
      startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);

        document.getElementById("timeclock").innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(this.startTime, 500);
      },
      checkTime(i) {
        if (i < 10) {
          i = "0" + i
        };
        return i;
      },
      showDate() {
        var d = new Date();
        var n = d.toDateString();
        document.getElementById("date").innerHTML = n;
      }
    },

    mounted() {
      this.startTime();
      this.showDate();
    }
  }
</script>
