<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    props: {
        title: String,
        id: Number,
        change: Function,
    }
}
</script>
<template>
    <div class="display">
        <div class="title">
            This is the title
        </div>
        {{title}} - {{id}}
    </div>
    <div>
        <button class="askbutton" rotate=90 @click="change">Press me</button>
    </div>
    <ul class="nom">
        <li class="nom active">Erste</li>
        <li class="nom ">Zweite</li>
        <li class="nom ">Dritte</li>
    </ul>
</template>
<style>
.display {
    background-color: aliceblue;
    border-radius: 10%;
}

:root {
    --maincolor: pink;
    --secondcolor: aqua;
}

.nom {
    background-color: azure;
}

.nom.active {
    background-color: khaki;
}

.askbutton {
    background-color: var(--maincolor);
    position: relative;
    /* background-color: pink */
    animation: anime 2s infinite;
    /* transform: rotate(90deg) */

}

button[rotate]::before {
    transform: rotate(attr(rotate));
    display: inline-block;
    content: attr(rotate)
}


@keyframes anime {
    0% {}

    30% {
        left: -70px;
        background: var(--maincolor)
    }

    50% {
        left: -50px;
        background: red
    }

    100% {
        left: 0px;
        background: var(--secondcolor)
    }
}
</style>