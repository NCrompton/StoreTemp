<script setup lang="ts">
import AskArea from './AskArea.vue'
</script>
<script lang="ts">
export default {
    data() {
        return {
            count: 1,
            text: "Go!",
            message: "",
            posts: [
                { id: 1, title: "Hello" },
                { id: 2, title: "Guten Tag" },
                { id: 3, title: "Bonjour" }
            ],
            color: 20
        }
    },
    props: ['title'],
    emits: ['update:title'],
    methods: {
        increment() {
            this.count++
            console.log(this.title)
        },
        incrementcolor() {
            this.color++;
        }
    },
    mounted() {
        console.log(this.count)
        this.count = 2
    },
    created() {
        console.log(this.title)
    }
} 
</script>

<template>
    Hello Welt {{count}}
    <button @click="increment">press me</button>
    <div class="round">
        {{count + 2}} - {{text}}
    </div>
    <div class="inputarea">
        <input class="title_in" type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
        <input v-model="message" class="title_in" type="text" />
        <p>{{message}}</p>
    </div>
    <div class="low" :style="{borderRadius: color + '%'}">
        <AskArea v-for="post in posts" :id="post.id" :title="post.title" :change="increment" />
        <li v-for="item in posts">
            {{item.title}}
        </li>
        <button @click="incrementcolor">press</button>
    </div>
</template>

<style>
button {
    border: 2px;
    border-radius: 20%;
    border-width: 3px;
    height: 50px;
    border-style: solid;
    background-color: white;
    text-align: left;
    cursor: pointer;
}

.low {
    display: block;
}

button:hover {
    background-color: aquamarine;
}

.inputarea {
    border-style: solid;
    border-radius: 20%;
    height: min-content;
}

.title_in {
    background-color: bisque;
    margin: 15px;
}

.round {}
</style>