import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const translate = ref('zero')
    const doubleCount = computed(() => count.value * 2)
    const translation = count.value * 2
    function increment() {
        count.value++
    }
    function reverseTranslate() {
        return translate.value.split('').reverse().join('')
    }

    return {
        count,
        doubleCount,
        translate,
        translation,
        increment,
        reverseTranslate,
    }
})

export const useUserStore = defineStore('user', () => {
    type User = {
        name: string
        id: number
        books: Array<string>
    }
    const users: Ref<Array<User>> = ref([
        { name: 'Test', id: 1, books: ['A', 'B'] },
    ])
    const getOddUser = users.value.filter((user) => {
        return user.id % 2 === 0
    })
    function addUser(user: User) {
        return users.value.push(user)
    }
    return {
        users,
        getOddUser,
        addUser,
    }
})
