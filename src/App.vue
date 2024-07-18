<!-- 
This file defines a Vue.js component for the header of a to-do application.
It manages user authentication states, displays navigation links conditionally based on the user's login status, and includes functionality to log out users.
-->

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-col-primary">
  <header class="sticky top-0 shadow-lg bg-col-secondary">    
      <!-- Display a welcome message using the HelloWorld component -->
      <HelloWorld msg="Final Ironhack Project" /> 
      <!-- Navigation links -->
      <nav class="container flex flex-1 flex-col sm:flex-row items-center justify-center gap-4 py-6">
        <template v-if="!isLoggedIn">
          <!-- If the user is not logged in, show these links -->
          <RouterLink class="btn btn-warning text-xl" to="/auth/login">Login</RouterLink>
          <RouterLink class="btn btn-warning text-xl" to="/auth/register">Register</RouterLink>
        </template>
        <template v-else>
          <!-- If the user is logged in, show these links -->
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/">Home</RouterLink>
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/about">About</RouterLink>
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/profile">Profile</RouterLink>
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/all-tasks">All Tasks</RouterLink>
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/completed-tasks">Completed Tasks</RouterLink>
          <RouterLink class="btn btn-warning text-xl sm:btn-sm md:btn-md" to="/add-task">Add New Task</RouterLink>
          <button class="btn btn-outline btn-warning sm:btn-sm md:btn-md" @click="handleSignOut">Sign Out</button>
        </template>
      </nav>  
  </header>
  <!-- RouterView to display the current route's component -->
  <RouterView />
</div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import the HelloWorld component
import HelloWorld from "./components/HelloWorld.vue";
// Import ref, onMounted, and onBeforeMount from Vue
import { ref, onMounted, onBeforeMount } from "vue";
// Import storeToRefs from Pinia to keep reactivity
import { storeToRefs } from "pinia";
// Import useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Import useUserStore to access user-related data
import { useUserStore } from "./stores/user";

// ------------------------------------------------------------------------
// Variable Definition Block
// ------------------------------------------------------------------------

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'user' and 'isLoggedIn' out of the store, keeping their reactivity using storeToRefs
const { user, isLoggedIn } = storeToRefs(userStore);
// Reactive variable to hide/show elements based on user login status
const isUserloggedIn = ref(false);


// ------------------------------------------------------------------------
// Lifecycle Hook: onMounted
// ------------------------------------------------------------------------

// Using the onMounted lifecycle hook to perform actions when the component is mounted
onMounted(() => {
  console.log("hello calling function");
  try {
    // Fetch the user data from the store
    userStore.fetchUser();
    // Check if the user is stored in localStorage
    if (!user.value) {
      // If no user is found, redirect to login page
      router.push({ path: "/auth/login" });
    } else {
      // If user is found, update the reactive variable and redirect to home
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});

// ------------------------------------------------------------------------
// Function to Sign Out User
// ------------------------------------------------------------------------

/**
 * Signs out the user and redirects to the login page.
 */
let handleSignOut = () => {
  // Call the signOut function from the user store
  userStore.signOut();
  // Redirect to login page
  router.push({ path: "/auth/login" });
  // Update the reactive variable to false
  isUserloggedIn.value = false;
};

/*
  The handleSignOut function is used to log out the current user.
  - It calls the signOut function from the user store to clear user data.
  - It redirects the user to the login page.
  - It updates the isUserloggedIn reactive variable to false.
  */

// ------------------------------------------------------------------------
// Additional Lifecycle Hooks (Placeholder for onBeforeMount, onUpdated)
// ------------------------------------------------------------------------

// Additional lifecycle hooks such as onBeforeMount and onUpdated can be added here if needed.
</script>

<!-- 
What is storeToRefs?
In order to extract properties from the store while keeping its reactivity, you need to use storeToRefs(). It will create refs for every reactive property. This is useful when you are only using state from the store but not calling any action. Note you can destructure actions directly from the store as they are bound to the store itself too.
Link: https://pinia.vuejs.org/core-concepts/
-->

