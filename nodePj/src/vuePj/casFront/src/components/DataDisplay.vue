<script setup lang="ts">
import { ref, type Ref } from "vue"
import { useCounterStore, useUserStore } from "@/stores/counter";
import { defineStore, mapStores, mapState } from "pinia";

const temp = ref(["op"])
const name = ref("Verwirrung")
const display = ref(0)
const book = ref("")
const booklist: Ref<Array<string>> = ref([])
const counter = useCounterStore()
const users = useUserStore()
const userlist = users.users
const { name: uname, id, books } = users.users[0]
mapStores(counter, useUserStore)
mapState(useCounterStore, ['count'])

const onButtonClick = () => {
    temp.value = temp.value.concat("new item")
    name.value = name.value === "Verwirrung" ? "Verwaltung" : "Verwirrung"
    //counter.count++
    //counter.increment()
    counter.$patch({ count: counter.count + 1 })
    display.value = counter.doubleCount
    temp.value.push(counter.reverseTranslate())
    addBook()
}


function addUser() {
    return users.addUser({ name: name.value, id: userlist.length + 1, books: ["A", "b", ...booklist.value] })
}

function addBook() {
    booklist.value = booklist.value.concat(book.value)
}

</script>
<script lang="ts">
export default {
    data() {
        return {
            ip: "123.0.0.0"
        }
    },
    inject: ['theme'],
    methods: {
        changeIp() {
            this.ip = "0.0.123.0"
        }
    },
    mounted() {
        console.log(this.$attrs.value)
    }
}
</script>

<template>
    <div class="content-box">
        <span v-if="theme === 'dark'">This is dark</span>
        <table class="display">
            <thead>
                <td>{{temp}}</td>
                <td>{{name}}</td>
                <td>{{ip}}</td>
            </thead>
            <tr>
                <div class="input-area">
                    <input v-model="name" class="input-box" type="text" />
                    <input v-model="book" class="input-box" type="text" />
                    <input id="book" class="input-box" type="number">
                </div>
                {{booklist}}
                <button @click="changeIp">change IP</button>
                <button @click="onButtonClick">add item</button>
                <button @click="addUser">add user</button>
                <td v-bind="$attrs">{{uname}}</td>
                <td>{{display}}</td>
            </tr>
            <tr v-for="user in userlist">
                <td class="bg-slate-200">{{user.name}}</td>
                <td>{{user.id}}</td>
                <td>{{user.books}}</td>
            </tr>
            <tr>
                <slot name="inside"></slot>
            </tr>
        </table>
    </div>
    <slot name="main"></slot>
</template>

<style>
tr button {
    margin-right: 10px
}

.input-area {
    width: 50px;

}

.input-box {
    background-color: white;
    border: solid 2px;
    border-radius: 7px;
}

.input-box:focus[type="text"] {
    background-color: black;
    @apply bg-slate-300
}

span {
    background-clip: content-box;
    background-color: brown;
    padding: 5px;
    border: solid 2px;
    margin: 10px;
    @apply transition-all
}

span:hover {
    background-clip: border-box;
    background-color: gray;
}
</style>