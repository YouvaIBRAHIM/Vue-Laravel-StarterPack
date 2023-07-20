<script setup>
import { ref } from "vue";
import { store } from "@/services/auth.js";
import { isValidEmail } from "@/services/utils";

const form = ref({
  email: "",
  password: "",
});

const visible = ref(false);

const rules = {
  required: (value) => value?.trim() !== "" ? true : "Champ obligatoire",
  isValidEmail: (value) => isValidEmail(value) ? true : "L'email est invalide",
}

</script>

<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-form @submit.prevent="store.handleLogin(form)">
        <v-text-field
          density="compact"
          class="mb-2" 
          label="Email"
          placeholder="Saisissez votre email"
          prepend-inner-icon="mdi-email-outline"
          variant="filled"
          :rules="[rules.required, rules.isValidEmail]"
          v-model="form.email"
        ></v-text-field>
        <v-alert
          type="error"
          v-if="store?.errors?.email"
          :text="store.errors.email[0]"
        />

        <v-text-field
          :append-inner-icon="!visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="!visible ? 'password' : 'text'"
          density="compact"
          class="mb-2" 
          label="Mot de passe"
          placeholder="Saisissez votre mot de passe"
          prepend-inner-icon="mdi-lock-outline"
          variant="filled"
          @click:append-inner="visible = !visible"
          :rules="[rules.required]"
          v-model="form.password"
        ></v-text-field>

        <v-alert
          type="error"
          v-if="store?.errors?.password"
          :text="store.errors.password[0]"
        />
        
        <v-btn block type="submit" class="mb-8" color="blue" size="large" variant="tonal">
          Log In
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
