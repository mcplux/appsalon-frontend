<script setup>
import { inject } from 'vue'
import { reset } from '@formkit/vue'
import AuthAPI from '@/api/AuthAPI'

const toast = inject('toast')

const handleSumbit = async ({password_confirm, ...formData}) => {
  try {
    const { data } = await AuthAPI.register(formData)
    toast.open({
      message: data.msg,
      type: 'success',
    })

    reset('registerForm')
  } catch (err) {
    toast.open({
      message: err.response.data.msg,
      type: 'error',
    })
  }
}
</script>

<template>
  <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
  <p class="text-xl lg:text-2xl text-white text-center my-5">Crea tu cuenta en AppSalon</p>

  <FormKit 
    id="registerForm" 
    type="form" 
    incomplete-message="No se pudo enviar, revisa los mensajes" 
    :actions="false" 
    @submit="handleSumbit"
  >
    
    <FormKit 
      type="text"
      label="Nombre"
      name="name"
      placeholder="Escribe tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto',
      }"
    />

    <FormKit 
      type="email"
      label="Email"
      name="email"
      placeholder="Escribe un email de registro"
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
      placeholder="Crea una contraseña de al menos 8 caracteres"
      validation="required|length:8"
      :validation-messages="{
        required: 'La contraseña es obligatorio',
        length: 'La contraseña debe contener al menos 8 caracteres',
      }"
    />

    <FormKit 
      type="password"
      label="Confirmar contraseña"
      name="password_confirm"
      placeholder="Repite tu contraseña"
      validation="required|confirm"
      :validation-messages="{
        required: 'El campo es obligatorio',
        confirm: 'Las contraseñas no coinciden',
      }"
    />

    <FormKit type="submit">Crear cuenta</FormKit>
  </FormKit>
</template>
