import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI'
import { convertToISO } from '@/helpers/date.js'

export const useAppointmentsStore = defineStore('appointments', () => {
  const router = useRouter()

  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const appointmentsByDate = ref([])

  const toast = inject('toast')

  onMounted(() => {
    const startHour = 9
    const endHour = 19

    for(let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`)
    }
  })

  watch(date, async () => {
    time.value = ''
    if(date.value === '') return

    const { data } = await AppointmentAPI.getByDate(date.value)
    appointmentsByDate.value = data
  })

  function onServiceSelected(service) {
    if(services.value.some(selectedService => selectedService._id === service._id)) {
      services.value = services.value.filter(selectedService => selectedService._id !== service._id)
    } else {
      if(services.value.length === 2) {
        alert('Máximo 2 servicios por cita')
        return
      }
      services.value.push(service)
    }

  }

  async function createAppointment() {
    const appointment = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    }

    try {
      const { data } = await AppointmentAPI.create(appointment)
    
      toast.open({
        message: data.msg,
        type: 'success',
      })

      clearAppointmentData()
      router.push({ name: 'my-appointments' })
    } catch (err) {
      console.log(err)
    }
  }

  function clearAppointmentData() {
    services.value = []
    date.value = ''
    time.value = ''
  }

  const isServiceSelected = computed(() => {
    return id => services.value.some(service => service._id === id)
  })

  const noServicesSelected = computed(() => services.value.length === 0)

  const totalAmount = computed(() => services.value.reduce((total, service) => total + service.price, 0))

  const isValidReservation = computed(() => services.value.length && date.value.length && time.value.length)

  const isDateSelected = computed(() => date.value)

  const disableTime = computed(() => hour => appointmentsByDate.value.find(appointment => appointment.time === hour))

  return {
    services,
    date,
    hours,
    time,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    isValidReservation,
    isDateSelected,
    disableTime,
  }
})
