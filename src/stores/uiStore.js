import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isMobileModalOpen: false
  }),
  actions: {
    openModal() {
      this.isMobileModalOpen = true
    },
    closeModal() {
      this.isMobileModalOpen = false
    }
  }
})
