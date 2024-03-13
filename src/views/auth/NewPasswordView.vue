<script setup>
import { onMounted, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthAPI from '@/api/AuthAPI'

const route = useRoute()
const router = useRouter()

const toast = inject('toast')

const validToken = ref(false)

const { token } = route.params
onMounted(async () => {
  try {
    const { data } = await AuthAPI.verifyPasswordResetToken(token)

    validToken.value = true
  } catch (err) {
    toast.open({
      message: err.response.data.msg,
      type: 'error',
    })
  }
})

const handleSumbit = async ({ password }) => {
  try {
    const { data } = await AuthAPI.updatePassword(token, { password })
    toast.open({
      message: data.msg,
      type: 'success',
    })
    router.push({ name: 'login' })
  } catch (err) {
    toast.open({
      message: err.response.data.msg,
      type: 'error',
    })
  }
}
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-4xl lg:text-6xl font-extrabold text-white text-center mt-10">Nueva contraseña</h1>
    <p class="text-xl lg:text-2xl text-white text-center my-5">Crea una nueva contraseña</p>

    <FormKit 
      id="forgotPasswordForm" 
      type="form" 
      incomplete-message="No se pudo enviar, revisa los mensajes" 
      :actions="false" 
      @submit="handleSumbit"
    >

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

      <FormKit type="submit">Cambiar contraseña</FormKit>
    </FormKit>
  </div>

  <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>

</template>
