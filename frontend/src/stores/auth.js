import { defineStore } from 'pinia'
import apiClient from '@/api/client'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/auth/login/', credentials)
        const { access, refresh, user } = response.data

        this.token = access
        this.user = user
        this.isAuthenticated = true

        localStorage.setItem('token', access)
        localStorage.setItem('refreshToken', refresh)

        return { success: true }
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.detail || '로그인에 실패했습니다.'
        }
      }
    },

    async register(userData) {
      try {
        const response = await apiClient.post('/auth/register/', userData)
        const { access, refresh, user } = response.data

        this.token = access
        this.user = user
        this.isAuthenticated = true

        localStorage.setItem('token', access)
        localStorage.setItem('refreshToken', refresh)

        return { success: true }
      } catch (error) {
        return {
          success: false,
          error: error.response?.data || '회원가입에 실패했습니다.'
        }
      }
    },

    async fetchUser() {
      try {
        const response = await apiClient.get('/auth/me/')
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }
})
