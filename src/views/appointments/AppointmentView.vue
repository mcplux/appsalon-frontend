<script setup>
import SelectedService from '@/components/SelectedService.vue'
import { useAppointmentsStore } from '@/stores/appointments'
import { formatCurrency } from '@/helpers'

const appointments = useAppointmentsStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Detalles de la cita</h2>
  <p class="text-white text-lg mt-5">Verifica la información y confirma tu cita</p>

  <h3 class="text-3xl font-extrabold text-white mt-10">Servicios</h3>

  <p v-if="appointments.noServicesSelected" class="text-white text-xl text-center mt-10">
    No hay servicios seleccionados
  </p>

  <div class="grid gap-5 mt-5" v-else>
    <SelectedService 
      v-for="service in appointments.services"
      :key="service._id"
      :service="service"
    />

    <p class="text-right text-white text-xl">
      Total a pagar: <span class="font-black">{{ formatCurrency(appointments.totalAmount) }}</span>
    </p>
  </div>
</template>
