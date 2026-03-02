import apiClient from '../utils/apiClient'

function createService(endpoint) {
  return {
    async getAll() {
      return apiClient.get(`/${endpoint}`)
    },

    async getById(id) {
      return apiClient.get(`/${endpoint}/${id}`)
    },

    async create(payload) {
      return apiClient.post(`/${endpoint}`, payload)
    },

    async update(id, payload) {
      return apiClient.put(`/${endpoint}/${id}`, payload)
    },

    async remove(id) {
      return apiClient.delete(`/${endpoint}/${id}`)
    },

    async toggleVisibility(id) {
      return apiClient.patch(`/${endpoint}/${id}/visibility`)
    },
  }
}

export const projectService = createService('projects')
export const certService = createService('certifications')
export const skillService = createService('skills')
export const experienceService = createService('experience')

export const profileService = {
  async get() {
    return apiClient.get('/profile')
  },

  async update(payload) {
    return apiClient.put('/profile', payload)
  },
}