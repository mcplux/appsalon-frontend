<script setup>
import { RouterView } from 'vue-router'

const authRoutes = [
  { name: 'register', text: 'Crear una cuenta' },
  { name: 'login', text: 'Iniciar sesión' },
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <RouterView />

    <nav class="mt-10 flex flex-col space-y-5 items-center lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink v-for="authRoute in authRoutes" class="uppercase font-bold text-white" :to="{ name: authRoute.name }" >
        {{ authRoute.text }}
      </RouterLink>
    </nav>
  </div>
</template>
