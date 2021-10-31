<template>
  <div class="cube">
    <!-- 引入图片 -->
    <div class="box1">
      <img src="../../assets/img/animation/1.png" alt="">
    </div>
    <div class="box2">
      <img src="../../assets/img/animation/2.png" alt="">
    </div>
    <div class="box3">
      <img src="../../assets/img/animation/3.jpeg" alt="">
    </div>
    <div class="box4">
      <img src="../../assets/img/animation/4.jpeg" alt="">
    </div>
    <div class="box5">
      <img src="../../assets/img/animation/5.jpeg" alt="">
    </div>
    <div class="box6">
      <img src="../../assets/img/animation/6.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Cube',
    methods: {

    },
  }
</script>
<style scoped>
  html {
    perspective: 800px;
  }
  .cube {
    width: 500px;
    height: 200px;
    margin: 100px auto;
    /* 设置3d变形效果 */
    transform-style: preserve-3d;
    transform: rotateX(45deg) rotateZ(45deg);
    animation: rotate 10s infinite linear;
  }

  .cube>div {
    width: 200px;
    height: 200px;
    position: absolute;
  }

  img {
    height: 200px;
    width: 200px;
    vertical-align: top;
  }

  .box1 {
    transform: rotateX(90deg) translatez(100px);
  }

  .box2 {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .box3 {
    transform: rotateY(90deg) translateZ(100px);
  }

  .box4 {
    transform: rotateY(-90deg) translateZ(100px);
  }

  .box5 {
    transform: translateZ(100px);
  }

  .box6 {
    transform: rotateY(-180deg) translateZ(100px);
  }

  @keyframes rotate {
    from {
      transform: rotateX(0) rotateZ(0)
    }

    to {
      transform: rotateX(1turn) rotateZ(1turn)
    }
  }
</style>