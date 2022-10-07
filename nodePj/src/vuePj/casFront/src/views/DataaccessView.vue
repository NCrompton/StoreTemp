<script setup lang="ts">
import DataDisplay from '../components/DataDisplay.vue'
</script>
<script lang="ts">
</script>

<template>
    <DataDisplay>
        <template #inside>
            <td>One of it</td>
            <td>two of it</td>
        </template>
        <template #main>
            <div class="bg-slate-300 border-solid">
                <a href="www.google.com">GOOGLE</a>
            </div>
        </template>
    </DataDisplay>
</template>