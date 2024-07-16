<!-- 
This file defines the Home View component of a Vue.js application.
It demonstrates how to consume and display data from a Pinia store, and how to call store functions.
-->

<template>
  <main class="min-h-screen flex flex-col items-center py-6 px-4">
    <h4 class="text-gray-800 text-center text-2xl font-bold py-6">Home View</h4>

    <!-- First way of consuming data from the store -->
    <!-- Even though it is accessible, this can be hard to read, so get used to reading -->
    <p class="text-gray-600 py-2">{{ useCounterStore().count }}</p>

    <!-- Using 2nd way -->
    <p class="text-gray-600 py-2">{{ countNumber }}</p>
    <p class="text-gray-600 py-2">{{ doubleCountNumber }}</p>
    <button @click="incrementNumberFunctionFromStore" class="btn btn-primary m-6">Add +1</button>
  </main>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import computed from Vue for reactive calculations
import { computed } from "vue";
// Import useCounterStore to access the counter store
import { useCounterStore } from "../stores/counter";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Access the counter store and store it in a variable for easier reference
let countStore = useCounterStore();

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Store the 'count' variable from the store in a computed property for real-time updates
let countNumber = computed(() => countStore.count);

// Store the 'doubleCount' variable from the store
let doubleCountNumber = countStore.doubleCount;

// ------------------------------------------------------------------------
// Methods Block
// ------------------------------------------------------------------------

// Access the 'increment' function from the store to be used in the template
let incrementNumberFunctionFromStore = countStore.increment;

const userStore = useUserStore();
const { getTasksForUser } = storeToRefs(userStore);

console.log(userStore.getTasksForUser());

/*
  The incrementNumberFunctionFromStore is used to increment the count in the store.
  - It accesses the increment function from the counter store.
  - This function is called when the button in the template is clicked.
  */
</script>
