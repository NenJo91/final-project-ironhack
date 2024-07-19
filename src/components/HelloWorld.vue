<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center text-gray-800 pt-4 dark:text-col-secondary">{{ msg }}</h1>
  </div>
</template>

