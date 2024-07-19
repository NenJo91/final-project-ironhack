<!--
This file defines a Vue.js component for the sign-up process in a to-do application.
By building this component, we will achieve a user interface that allows users to register by providing their email and password, with state management handled by Pinia.js.
-->

<template>
  <div class="flex flex-col justify-center font-Roboto sm:h-screen p-4">
    <div class="max-w-md w-full mx-auto shadow-xl rounded-2xl p-8">
      <div class="text-center mb-12">
        <h3 class="text-gray-800 text-center text-2xl font-bold">Register to To-Do App</h3>
        <p class="text-gray-800 text-center text-2xl font-bold">Start organizing your tasks!</p>
      </div>
    <form @submit.prevent="signUp">
      <div class="space-y-6">
        <!-- Email Input Field -->
        <div>
          <label class="text-gray-800 text-sm mb-2 block">E-mail</label>
          <input
            name="email"
            type="email"
            class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            placeholder="example@gmail.com"
            id="email"
            v-model="formState.email"
            required
          />
        </div>
        <!-- Password Input Field -->
        <div>
          <label class="text-gray-800 text-sm mb-2 block">Password</label>
          <input
            name="password"
            type="password"
            class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            placeholder="**********"
            id="password"
            v-model="formState.password"
            required
          />
        </div>
        <!-- Confirm Password Input Field -->
        <div>
          <label class="text-gray-800 text-sm mb-2 block">Confirm password</label>
          <input
            name="cpassword"
            type="password"
            class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
            placeholder="**********"
            id="confirmPassword"
            v-model="formState.confirmPassword"
            required
          />
        </div>
        </div>
        <div class="!mt-12">
        <!-- Sign Up Button -->
        <button class="w-full py-3 px-4 text-sm tracking-wider rounded-md text-white font-semibold bg-col-secondary hover:bg-green-500 focus:outline-none" type="submit">Register</button>
        </div>
        <p class="text-gray-800 text-sm mt-6 text-center">
          Have an account?
          <!-- PersonalRouter component for navigation -->
          <PersonalRouter
            :route="goToRoute"
            :buttonText="buttonText"
            class="text-col-secondary font-semibold hover:underline ml-1 dark:text-white"
          />
        </p>
      </form>
      </div>
    </div>
      <!-- Display error message if any -->
    <div v-show="formState.errorMsg">{{ formState.errorMsg }}</div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Importing reactive from Vue to create a reactive form state object
import { reactive } from "vue";
// Importing useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Importing PersonalRouter component for navigation links
import PersonalRouter from "./PersonalRouter.vue";
// Importing the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";

// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------

// Route Variables for navigating users
// Remember they are just storing strings
// Not reactive in nature, so nor eff or reactive
const goToRoute = "/auth/login";
const buttonText = "Sign In";

// Consolidating input fields and error messages into a reactive object
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  confirmPassword: "", // Stores the confirm password input
  errorMsg: "", // Stores any error messages
});

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();

// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

// Function to handle the SignUp process
const signUp = () => {
  // Conditional Logic only using a simple IF statement
  if (formState.password === formState.confirmPassword) {
    try {
      // Utilizes the register function from the user store to register the user
      userStore.register(formState.email, formState.password);
      // On successful sign up, redirect the user to the login page
      router.push({ path: goToRoute });
    } catch (error) {
      // On failure, display an error message
      formState.errorMsg = error.message;
      // Automatically clear the error message after 5 seconds
      setTimeout(() => {
        formState.errorMsg = "";
      }, 5000);
    }
    return;
  }
  // Sets error message if passwords do not match
  formState.errorMsg = "Passwords do not match. Please try again.";
  setTimeout(() => {
    formState.errorMsg = "";
  }, 2000);
};

/*
  The signUp function handles the registration process.
  - It checks if the passwords match and, if so, calls the register function from the user store to register the user.
  - On successful registration, it redirects the user to the login page.
  - If there is an error during registration, it displays an error message and clears it after 5 seconds.
  - If the passwords do not match, it sets an error message and clears it after 2 seconds.
  */
</script>
