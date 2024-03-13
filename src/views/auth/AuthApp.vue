<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const authRoutes = [
  { name: 'login', text: 'Iniciar sesión' },
  { name: 'register', text: 'Crear una cuenta' },
  { name: 'forgot-password', text: 'Olvidé mi contraseña' },
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <RouterView />

    <nav class="mt-10 flex flex-col space-y-5 items-center lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink 
        v-for="authRoute in authRoutes" 
        class="uppercase font-bold text-white" 
        :class="{ 'hidden' : route.name === authRoute.name }"
        :to="{ name: authRoute.name }" 
      >
        {{ authRoute.text }}
      </RouterLink>
    </nav>
  </div>
</template>
