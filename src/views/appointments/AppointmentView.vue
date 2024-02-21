<script setup>
import { ref } from 'vue'
import SelectedService from '@/components/SelectedService.vue'
import { useAppointmentsStore } from '@/stores/appointments'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { formatCurrency } from '@/helpers'

const appointments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YY',
  month: 'MMM',
})

const disableDate = date => {
  const today = new Date()

  return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
}
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

  <div class="space-y-8" v-if="!appointments.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker
          :disable-date="disableDate"
          disable-in-range
          i18n="es-co"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointments.date"
        />
      </div>

      <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
        <button 
          v-for="hour in appointments.hours" 
          class="block rounded-lg text-xl font-black p-3"
          :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
          @click="appointments.time = hour"  
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div class="flex justify-end" v-if="appointments.isValidReservation">
      <button 
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase text-sm text-white font-black" 
        @click="appointments.createAppointment"
      >
        Confirmar reservación
      </button>
    </div>
  </div>
</template>
