<script setup lang="ts">
import { computed } from 'vue';
import { contactStore } from "~/stores/contact/contact";

const useStore = contactStore();

const contacts = computed(() => useStore.contacts);

const formatNumber = (number?: string | number): string => {
  if (number === undefined) {
    return '';
  }
  if (typeof number === 'number') {
    number = number.toString();
  }
  if (number.length === 6) {
    return `${number.slice(0, 2)}-${number.slice(2, 4)}-${number.slice(4, 6)}`;
  }
  return number;
};
</script>

<template>
  <ul v-if="contacts.length !== 0" class="w-max flex flex-col justify-center items-center gap-2">
    <li v-for="contact in contacts" :key="contact.email">
      {{ contact.email }} - {{ formatNumber(contact.number) }}
    </li>
  </ul>
  <p v-else>Please provide right values</p>
</template>