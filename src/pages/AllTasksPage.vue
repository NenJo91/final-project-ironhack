<!--
This file defines a Vue.js component for displaying and managing tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of all tasks,
allowing users to mark tasks as completed and delete them, leveraging global state management with Pinia.js.
-->

<template>
    <div class="min-h-screen flex flex-col items-center py-6 px-4">
      <h4 class="text-gray-800 text-center text-2xl font-bold py-6">This Page Displays all tasks</h4>
    <!-- Conditional rendering to display user-specific tasks if available, otherwise display all tasks -->
    <div class="w-full max-w-4xl">
    <ul class="space-y-4" v-if="userTasks.length > 0">
      <!-- v-for directive to iterate over each task in tasks array -->
      <li v-for="task in userTasks" v-bind:key="task.id" class="bg-white p-4 rounded shadow-md" :class="{ 'line-through text-gray-400': task.isCompleted }">
        <!-- Display the title of the task -->
        <h5 class="text-lg font-semibold text-gray-900">{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6 class="text-gray-700">{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6 class="text-gray-700">{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul class="list-disc list-inside mt-2">
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            v-bind:key="index"
            class="text-gray-600"
          >
            {{ extraInfo }}
          </li>
        </ul>
        <!-- Display whether the task is completed or incomplete -->
        <h6 class="mt-2 text-gray-800">{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <!-- Display high priority label if applicable -->
        <h6 v-if="task.description.highPriority" class="mt-2 text-red-500 font-bold">High Priority</h6>
        <!-- Button to mark the task as completed / incompleted -->
        <button
          @click="markTaskCompleted(task.id)"
          class="mt-2 mr-2 px-4 py-2 rounded text-white"
          :class="task.isCompleted ? 'bg-gray-500' : 'bg-green-500'"
        >
          {{ task.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed' }}
        </button>
        <!-- Button to delete the task -->
        <button class="mt-2 px-4 py-2 bg-red-500 text-white rounded" @click="deleteTask(task.id)">Delete Task</button>
        </li>
    </ul>
    <!-- Loop through the tasks array and render each task in a list item -->
    <ul v-else class="space-y-4">
      <!-- v-for directive to iterate over each task in tasks array -->
      <li v-for="task in tasks" 
        v-bind:key="task.id" 
        :class="['bg-white', 'p-4', 'rounded', 'shadow-md', { 'line-through text-gray-400': task.isCompleted,}]"
        >
        <!-- Display the title of the task -->
        <h5 class="text-lg font-semibold text-gray-900">{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6 class="text-gray-700">{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6 class="text-gray-700">{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul class="list-disc list-inside mt-2">
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            v-bind:key="index"
            class="text-gray-600"
          >
            {{ extraInfo }}
          </li>
        </ul>
        <!-- Display whether the task is completed or incomplete -->
        <h6 class="mt-2 text-gray-800">{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <!-- Display high priority label if applicable -->
        <h6 v-if="task.description.highPriority" class="mt-2 text-red-500 font-bold">High Priority!</h6>
        <!-- Button to mark the task as completed / incompleted -->
        <button
          @click="markTaskCompleted(task.id)"
          class="mt-2 mr-2 px-4 py-2 rounded text-white"
          :class="task.isCompleted ? 'bg-gray-500' : 'bg-green-500'"
        >
          {{ task.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed' }}
        </button>

        <!-- Button to delete the task -->
        <button @click="deleteTask(task.id)" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">Delete Task</button>
      </li>
    </ul>
    <div v-if="tasks.length === 0" class="text-center mt-3 text-red-800 font-semibold">
        <p>No tasks found !</p>
    </div>
   </div>
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------
// Import computed from Vue to create computed properties
import { computed } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";
// Import the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const taskstore = useTaskStore();
// Use the user store by saving it in a variable
const userStore = useUserStore();



// Destructure all the possible pieces of data that we want out of this
const { tasks, deleteTask, markTaskCompleted, getTasksByUserId } = taskstore; // Destructure necessary functions and state from the task store

// Functions Block


// Let's generate a function that uses a computed property to get tasks for the current user. Given that I want to use this function inside the template. I will be storing this function as a function expresseion. AKA, store in a variable.
const userTasks = computed(() => {
  // Let's condition if we have an user that is loggedIN and if we have a value for the reactive user variable inside the usrStore.
  if (userStore.isLoggedIn && userStore.user) {
    //If both user & isLogged exist we go ahead and return the function getTasksByUserId()
    return getTasksByUserId(userStore.user.id); // If the user is logged in, return the tasks associated with the user's ID
  }
  return []; // If the user is not logged in, return an empty array
});

   

/*
  The useTaskStore function is used to access the task store.
  - Destructure tasks, markTaskCompleted, deleteTask, and getTasksByUserId from the task store.
  - These will be used to interact with the global state of tasks.
  The useUserStore function is used to access the user store.
  - A computed property userTasks is defined to fetch tasks specific to the logged-in user using getTasksByUserId.
  - If no user-specific tasks are found, it falls back to displaying all tasks.
  */
</script>


<!--
Summary:
This file implements a Vue.js component that displays a list of tasks from the global state managed by Pinia.js.
It allows users to mark tasks as completed or delete them. The component leverages Pinia's state management to
interact with the tasks and provide necessary functionalities.
-->

