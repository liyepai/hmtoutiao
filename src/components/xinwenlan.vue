<template>
  <div class="single" v-if="shuju.type === 1 && shuju.cover.length <= 2"  @click="handlerClick">
    <div class="left">
      <p class="content">{{ shuju.title }}</p>
      <p class="info">
        <span>{{ shuju.user.nickname }}</span>
        <span>{{ shuju.comment_length }}跟帖</span>
      </p>
    </div>
    <img :src="shuju.cover[0].url" alt />
  </div>

  <div class="single1" v-else-if="shuju.type === 2"  @click="handlerClick">
    <p class="content">{{ shuju.title }}</p>
    <div class="video">
      <img :src="shuju.cover[0].url" alt />
      <div class="playicon">
        <van-icon name="play" />
      </div>
    </div>
    <p class="info">
      <span>{{ shuju.user.nickname }}</span>
      <span>{{ shuju.comment_length }}跟帖</span>
    </p>
  </div>

  <div class="single2" v-else-if="shuju.type === 1 && shuju.cover.lenght >= 3"  @click="handlerClick">
    <div class="left">
      <p class="content">{{ shuju.title }}</p>
      <div class="imgs">
        <img :src="item.url" alt v-for="item in shuju.cover" :key="item.id" />
      </div>
      <p class="info">
        <span>{{ shuju.user.nickname }}</span>
        <span>{{ shuju.comment_length }}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shuju"],
  methods: {
    handlerClick(event){
      this.$emit('click',event)
    }
  }
};
</script>

<style lang="less" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}

.single,
.single1,
.single2 {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
}

.single > img {
  width: 120/360 * 100vw;
  height: 70/360 * 100vw;
  object-fit: cover;
  padding-right: 5px;
}
.single2 > .imgs {
  display: flex;
  padding: 10px 0 0 0;
  > img {
    flex: 1;
    padding: 0 5px;
    box-sizing: border-box;
    display: block;
  }
}
.single1 > .video {
  width: 100%;
  height: 170/360 * 100vw;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  > .playicon{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%,50%);
    font-size: 50px;
    border: 1px solid #fff;
    border-radius: 25px;
    background-color: rgba(#fff, #fff, #fff, 0.5);
    
    
  }
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>
