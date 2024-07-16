<template>
  <main class="min-h-screen flex flex-col items-center py-6 px-4">
    <h4 class="text-gray-800 text-center text-2xl font-bold py-6">About View</h4>
    <button class="btn btn-primary m-6" @click="incrementNumberFunctionFromStore">Add +1</button>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";
// 2nd wa
// A bit easier because we can store the access of the store inside a variable which we then reference easier (take a look at the example with the vaar name 'countNumber')
let countStore = useCounterStore();

// -----
// -----
// Consuming a piece of state that happens to be a function
// How do we do it ?
let incrementNumberFunctionFromStore = countStore.increment;
</script>
