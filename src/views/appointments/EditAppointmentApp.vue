<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments'
import AppointmentAPI from '@/api/AppointmentAPI'

const route = useRoute()
const router = useRouter()
const appointments = useAppointmentsStore()

const { id } = route.params
onMounted(async () => {
  try {
    const { data } = await AppointmentAPI.getById(id)
    appointments.setSelectedAppointment(data)

  } catch (err) {
    router.push({ name: 'my-appointments' })
  }
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink 
      :to="{ name: 'edit-appointment' }" 
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>

    <RouterLink 
      :to="{ name: 'edit-appointment-details' }" 
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Resumen
    </RouterLink>
  </nav>

  <RouterView />
</template>
