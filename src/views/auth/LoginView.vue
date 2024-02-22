<script setup>
import { inject } from 'vue'
import AuthAPI from '@/api/AuthAPI'

const toast = inject('toast')

const handleSumbit = async (formData) => {
  try {
    const { data } = await AuthAPI.login(formData)

    console.log(data)
  } catch (err) {
    toast.open({
      message: err.response.data.msg,
      type: 'error',
    })
  }
}
</script>

<template>
  <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-10">Iniciar sesión</h1>
  <p class="text-xl lg:text-2xl text-white text-center my-5">Inicia sesión en AppSalon para agendar tu cita</p>

  <FormKit 
    id="registerForm" 
    type="form" 
    incomplete-message="No se pudo enviar, revisa los mensajes" 
    :actions="false" 
    @submit="handleSumbit"
  >

    <FormKit 
      type="email"
      label="Email"
      name="email"
      placeholder="Tu email"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'Email no válido',
      }"
    />

    <FormKit 
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Tu contraseña"
      validation="required"
      :validation-messages="{
        required: 'La contraseña es obligatorio'
      }"
    />

    <FormKit type="submit">Crear cuenta</FormKit>
  </FormKit>
</template>
