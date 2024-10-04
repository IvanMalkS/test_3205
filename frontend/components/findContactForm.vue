<script setup lang="ts">
import { reactive, ref } from 'vue';
import z from "zod";
import { contactStore } from "~/stores/contact/contact";

interface User {
  email: string;
  userNumber: string | number;
}

const useStore = contactStore();

const UserSchema = z.object({
  email: z.string().email(),
  userNumber: z.number(),
});

const formData = reactive<User>({
  email: '',
  userNumber: '',
});

const validationErrors = ref<string[]>([]);

const buttonText = ref<string>('submit');
const handleSubmit = async () => {
  validationErrors.value = [];
  try {
    if (typeof formData.userNumber === "string") {
      formData.userNumber = Number(formData.userNumber.replace(/\D/g, ''));
    }
    UserSchema.parse(formData);
    buttonText.value = 'Loading...';
    await useStore.getContact({
      email: formData.email,
      number: formData.userNumber,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      validationErrors.value = e.errors.map(err => err.message);
    } else {
      console.error('Unknown error:', e);
    }
  } finally {
    buttonText.value = 'submit';
  }
};
</script>

<template>
  <form class="flex flex-col justify-center items-center gap-2" @submit.prevent="handleSubmit">
    <h2 class="text-3xl">Find contact</h2>
    <input class="border-2" v-model="formData.email" placeholder="email" type="email" />
    <client-only>
      <input
          class="border-2"
          v-model="formData.userNumber"
          v-mask="'##-##-##'"
          placeholder="number"
          type="text"
      />
    </client-only>
    <button class="border-2 py-2 px-3" type="submit">{{ buttonText }}</button>
    <div v-if="validationErrors.length > 0" class="validation-errors">
      <ul>
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </form>
</template>

<style scoped>
.validation-errors {
  color: red;
  margin-top: 10px;
}
</style>
