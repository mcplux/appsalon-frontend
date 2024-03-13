<script setup>
import { inject } from 'vue'
import { reset } from '@formkit/core'
import AuthAPI from '@/api/AuthAPI'

const toast = inject('toast')

const handleSumbit = async ({ email }) => {
  try {
    const { data } = await AuthAPI.forgotPassword({ email })
    toast.open({
      message: data.msg,
      type: 'success'
    })
    reset('forgotPasswordForm')
  } catch (err) {
    toast.open({
      message: err.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-10">Olvidé mi contraseña</h1>
  <p class="text-xl lg:text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

  <FormKit 
    id="forgotPasswordForm" 
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

    <FormKit type="submit">Enviar instrucciones</FormKit>
  </FormKit>
</template>
