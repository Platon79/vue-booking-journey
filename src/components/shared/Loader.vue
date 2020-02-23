<template>
  <div class="loader">
    <div class="line line-1" :style="styling"></div>
    <div class="line line-2" :style="styling"></div>
    <div class="line line-3" :style="styling"></div>
    <div class="line line-4" :style="styling"></div>
    <div class="line line-5" :style="styling"></div>
  </div>
</template>

<script>
export default {
  props: {
    white: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styling() {
      return {
        backgroundColor: this.white ? '#f3f3f3' : '#f78e1e',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .loader {
    text-align: center;
  }

  .line {
    background-color: #f78e1e;
    height: 30px;
    width: 6px;
    margin: 2px;
    border-radius: 2px;
    display: inline-block;
    animation-name: line-loader;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: both;
  }

  .line-1 {
    animation-delay: -0.5s;
  }

  .line-2 {
    animation-delay: -0.4s;
  }

  .line-3 {
    animation-delay: -0.3s;
  }

  .line-4 {
    animation-delay: -0.2s;
  }

  .line-5 {
    animation-delay: -0.1s;
  }

  @keyframes line-loader {
    0%, 100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
    }
    50% {
      -webkit-transform: scaleY(0.4);
      transform: scaleY(0.4);
    }
  }

  @-webkit-keyframes line-loader {
    0%, 100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
    }
    50% {
      -webkit-transform: scaleY(0.4);
      transform: scaleY(0.4);
    }
  }
</style>
