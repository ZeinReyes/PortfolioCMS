import apiClient from '../utils/apiClient'

export const authService = {
  async login(email, password) {
    return apiClient.post('/auth/login', { email, password })
  },

  async me() {
    return apiClient.get('/auth/me')
  },
}