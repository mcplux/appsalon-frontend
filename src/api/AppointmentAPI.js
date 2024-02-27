import api from "@/lib/axios"

export default {
  create(data) {
    return api.post('/appointments', data)
  },
}
