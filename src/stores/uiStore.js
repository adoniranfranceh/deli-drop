import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    modalOpen: false
  }),
  actions: {
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    }
  }
})
