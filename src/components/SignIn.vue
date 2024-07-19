<!--
This file defines a Vue.js component for the login process in a to-do application.
By building this component, we will achieve a user interface that allows users to log in by providing their email and password, with state management handled by Pinia.js.
-->

<template>
  <div class="font-Roboto">
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="p-8 rounded-2xl shadow-xl">
        <div class="max-w-md w-96">
          <h3 class="text-gray-800 text-center text-2xl font-bold">Log In to To-Do App</h3>
             <!-- FORM GOES HERE -->
            <form @submit.prevent="signIn" class="mt-8 space-y-6">
                <!-- Email Input -->
               <div>
                <label class="text-gray-800 text-sm mb-2 block"
                >Email</label>
                  <div class="relative flex items-center">
                    <input id="email" type="text"  name="username" v-model="formState.email" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-white" placeholder="Enter user name" />            
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                          <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                      </svg>
                  </div>
              </div>
                <!-- Password Input -->
              <div>
                <label class="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                  <div class="relative flex items-center">
                    <input :type="passVisible ? 'text' : 'password'" id="password" name="password" v-model="formState.password" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-white" placeholder="Enter password" />
                    <svg @click="showPass" xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
              </div>
                <!-- Button -->
                 <!-- I personally like semantic elements, I think they are easier to read as an engineer -->
              <div class="!mt-8">
                <button type="submit" class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white font-semibold bg-col-secondary hover:bg-green-500 focus:outline-none">Sign In</button>
              </div>
                <p class="text-gray-800 text-sm !mt-8 text-center">
                  Don't have an account?
                  <PersonalRouter
                    :route="route"
                    :buttonText="buttonText"
                    class="text-col-secondary hover:underline ml-1 whitespace-nowrap font-semibold dark:text-white"
                  />
                </p>
            </form>
                <!-- END FORM -->
                <!-- Error Message Here -->
                <p class="text-center text-red-800 font-semibold" v-show="formState.errorMsg">{{ formState.errorMsg }}</p>
                <!-- END Error Message -->        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";




// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------



// Route Variables for navigating users
const route = "/auth/register";
const buttonText = "Register";

// Reactive variable to store email, password, and error messages
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  errorMsg: "", // Stores any error messages
});

// Reactive variable for password visibility
const passVisible = ref(false);

// Function to toggle password visibility
const showPass = () => {
  passVisible.value = !passVisible.value;
};

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'isLoggedIn' out of the store, keeping its reactivity using the storeToRefs method from Pinia
const { isLoggedIn } = storeToRefs(userStore);

// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

/**
 * Function to handle the SignIn process.
 * It validates the user's credentials using the signIn function from the user store.
 * On success, it redirects the user to the home page.
 * On failure, it displays an error message.
 */
let signIn = async () => {
  try {
    // 1- Hitting the user store, and hitting a function that is used to LOG IN
    await userStore.signIn(formState.email, formState.password);
    // 2- Change boolean isLoggedIn variable from the store
    isLoggedIn.value = true;
    // 3 - ReRoute the user to the home page
    router.push({ path: "/" });
  } catch (error) {
    // On failure, let's display an error message
    formState.errorMsg = error.message;
    // Hide this error message after a specific time
    // Hide after 8 seconds, remember that is using always milliseconds
    setTimeout(() => {
      formState.errorMsg = "";
    }, 8000);
  }
};

/*
  The signIn function handles the login process.
  - It validates the user's credentials using the signIn function from the user store.
  - On success, it sets isLoggedIn to true and redirects the user to the home page.
  - On failure, it displays an error message and hides it after 8 seconds.
  */
</script>


