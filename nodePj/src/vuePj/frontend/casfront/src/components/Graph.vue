<template>
  <div class="graph-container">
    <div class="graph">
      <div class="x-axis">
        <span class="x-legend">300</span>
        <span class="x-legend">600</span>
        <span class="x-legend">900</span>
      </div>
      <div class="y-axis">
        <span class="y-legend">0</span>
        <span class="y-legend">300</span>
        <span class="y-legend">600</span>
      </div>
      <div class="data-container">
        <li class="point-jeden" ref="jeden">
          <div class=""></div>
        </li>
        <li class="point-dwa">
          <div class=""></div>
        </li>
        <li class="point-trzy">
          <div class=""></div>
        </li>
        <li class="point-cztery">
          <div class=""></div>
        </li>
        <li class="point-piec">
          <div class=""></div>
        </li>
      </div>
      <button @click="drawLine">LOG</button>
    </div>
  </div>
  <div class="item-box">
    <div class="triangles"><svg xmlns="http://www.w3.org/2000/svg" width="300" height="100" fill="currentColor"
        class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg></div>
    <div class="text">Start</div>
    <div class="mask first"></div>
    <div class="mask second"></div>
    <div class="mask third"></div>
    <div class="item">
      <div class="target"></div>
    </div>
  </div>
  <div :style="{
    width: '100vh',
    height: '100px',
  }">s</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "Graph",
  setup() {
    const jeden = ref<HTMLDataListElement | null>(null)
    jeden.value?.style
  },
  methods: {
    drawLine() {
      console.log(this.$refs.jeden)
    }
  }
})
</script>
<style lang="sass">
.item-box
  height: 500px
  position: relative
.mask
  --time: 2000ms
  content: ""
  height: 500px
  width: 90%
  left: calc(100% - 100%)
  overflow: hidden
  position: absolute
.first
  animation: move var(--time) linear
  background: #c9c
.second
  animation: move2 var(--time) linear
  background: #cc9
.third
  animation: move3 var(--time) linear
  background: #9cc
.triangles
  position: absolute
  left: 20%
  top: 20%
  width: 600px
  height: 300px
  background: linear-gradient(#ccc, #777)
  z-index: 4
  opacity: 0.5
.item
  height: 300px
  width: 20px
  left: 0%
  top: 0%
  position: absolute
  overflow: hidden
  animation: rotation 2s linear infinite
.target
  width: 20px
  height: 20px
  background: #aaf
  position: absolute
.text
  position: absolute
  left: 30%
  top: 30%
  z-index: 2
  font-size: 150px
  animation: rise 2s linear infinite
  overflow: hidden
@keyframes rise
  0%
    top: 60%
    opacity: 0
  100%
    top: 20%

@keyframes rotation
  0%
    transform: rotate(0deg)
    left: 10%
  20%
    transform: rotate(90deg)
    left: 20%
  40%
    transform: rotate(180deg)
    left: 30%
  60%
    transform: rotate(270deg)
    left: 40%
  80%
    transform: rotate(360deg)
    left: 50%
  100%
    transform: rotate(360deg)
    left: 80%
    top: 50%

@keyframes move
  0%
    left: calc(-100%)
  20%
    left: calc(-100%)
  40%
    left: calc(20% - 100%)
  60%
    left: calc(40% - 100%)
  80%
    left: calc(60% - 100%)
  100%
    left: calc(100% - 100%)
@keyframes move2
  0%
    left: calc(-100%)
  30%
    left: calc(-100%)
  50%
    left: calc(20% - 100%)
  70%
    left: calc(40% - 100%)
  80%
    left: calc(50% - 100%)
  100%
    left: calc(100% - 100%)
@keyframes move3
  0%
    left: calc(-100%)
  40%
    left: calc(-100%)
  60%
    left: calc(20% - 100%)
  80%
    left: calc(40% - 100%)
  90%
    left: calc(70% - 100%)
  100%
    left: calc(100% - 100%)

.graph-container

.graph
  height: 500px
  width: 1000px
  background: #f5f5f5
  min-height: 250px
  margin-top: 10px
  display: grid
  grid-template-columns: 50px 1fr
  grid-template-rows: 1fr 40px
  grid-template-areas: "x content" "x y"
  position: relative
  background: linear-gradient(to bottom, #f5f5f5 50px, #ddd 0.5px)
  background-size: 100% 51px
  overflow: hidden

  .x-axis
    display: flex
    flex-direction: column
    flex-flow: column-reverse
    grid-area: x
    background-color: #aaa

    .x-legend
      padding-top: 100%
      align-self: center
      flex-grow: 1

    .x-legend::after
      width: 100px
      content: ""
      position: absolute
      background-color: #aa00aa

    &::after
      width: 10px
      background-color: #aa00aa

  .y-axis
    grid-area: y
    display: flex
    flex-direction: row
    background-color: #999

    .y-legend
      flex-grow: 1
      transform: rotate(45deg) translateX(50px) translateY(100px)

  .data-container
    grid-area: content

    li
      position: absolute
      list-style-type: none

    li > div::after
      position: absolute
      content: ""
      background-color: #cc00aa
      left: 0
      top: 0
      width: 4px

    .point-jeden
      translate: 100px 100px
    .point-jeden > div
      content: ""
      background-color: #cc00aa
      left: 0
      top: 0
      width: 4px
      --jeden-rotate: -63deg
      transform: rotate(var(--jeden-rotate))
      height: 111px
      translate: 50px -20px


    .point-dwa
      translate: 200px 150px
    .point-dwa > div:after
      --dwa-rotate: 55deg
      transform: rotate(var(--dwa-rotate))
      height: 122px
      translate: 50px -85px

    .point-trzy
      translate: 300px 80px
    .point-trzy > div:after
      --jeden-rotate: 90deg
      transform: rotate(var(--jeden-rotate))
      height: 100px
      translate: 50px -40px

    .point-cztery
      translate: 400px 80px
    .point-cztery > div:after
      --cztery-rotate: -40deg
      transform: rotate(var(--cztery-rotate))
      height: 156px
      translate: 50px -8px

    .point-piec
      translate: 500px 200px
    .point-piec > div:after
      --jeden-rotate: 90deg
      transform: rotate(var(--jeden-rotate))
      height: 100px
      translate: 50px -40px

</style>
