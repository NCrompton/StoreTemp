<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        log(e) {
            console.log(`${e} is pressed`)
            window.location.href = "/home"
        }
    }
}
</script>

<template>
    <div class="navbar">
        <div class="navContent">
            <div class="icon">
                Nav
            </div>
            <div class="itemslist">
                <div class="navhead">
                    <div class="navtitle">First</div>
                    <div class="navitem" @click="log">
                        Erste
                    </div>
                </div>
                <div class="navhead">
                    <div class="navtitle">Second</div>
                    <div class="navitem" @click={}>
                        Zweite
                    </div>
                </div>
                <div class="navhead">
                    <div class="navtitle">Third</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.navbar {
    display: flex;
    background-color: darkgrey;
    width: 100%;
}

.navContent {
    font-size: 5mm;
    display: flex;
    margin: 3px;
    padding-top: 1vh;
    padding-bottom: 1vh;
}

.itemslist {
    display: flex;
}

.icon {
    padding-left: 3px;
    padding-right: 3px;
    cursor: pointer;
}

.navhead {
    background-color: darkgrey;
    z-index: 1;
}

.navtitle {
    padding-left: 3vw;
    padding-right: 3vw;
}

.navitem {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: antiquewhite;
    padding-left: 20%;
    padding-right: 20%;
    display: none;
}

.navhead:hover .navitem {
    display: block;
    position: absolute;
}

.navhead:hover {
    background-color: #cccccc;

}
</style>