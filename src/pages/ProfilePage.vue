<template>
<div class="font-Roboto">
    <div class="min-h-screen flex flex-col items-center py-6 px-4">
      <div class="p-8 rounded-2xl shadow-xl">
        <div class="max-w-md w-96">
          <h3 class="text-gray-800 text-center text-2xl font-bold">Profile Page</h3>
             <!-- FORM GOES HERE -->
            <form class="mt-8 space-y-6">
                <!-- Email Input -->
               <div>
                <label class="input input-bordered flex items-center gap-2 bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" class="grow" placeholder="Email"/>
                </label>
              </div>
                <!-- Username Input -->
              <div>
                <label class="input input-bordered flex items-center gap-2 bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" class="grow" placeholder="Username" />
                </label>
              </div>
              <div>
                <label class="input input-bordered flex items-center gap-2 bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70">
                        <path
                        fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd" />
                    </svg>
                    <input type="password" class="grow" value="password" />
                </label>
              </div>
            </form>
            <fwb-button class="w-1/2 md:w-full mt-6 mx-auto py-3 px-4 text-sm tracking-wide rounded-lg" gradient="red" @click="editProfile">Edit Profile</fwb-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbButton } from 'flowbite-vue'
// Import reactive from Vue to make the tasks array reactive
import { reactive } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";
// Import useUserStore to access the currently logged-in user
import { useUserStore } from "../stores/user";

// Use the task store by saving it in a variable
const taskstore = useTaskStore();
// Use the user store by saving it in a variable
const userStore = useUserStore();

</script>
