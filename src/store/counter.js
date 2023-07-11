import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // States
  const count = ref(0)

  // Getters
  const isEven = computed(() => {
    return count % 2 == 0
  })  
  
  const messageIfEven = computed(() => {
    return (message) => {
      if (!isEven.value) return
      return message
    }
  })

  // Actions
  function increment() {
    this.count++
  }

  return { count, isEven, messageIfEven, increment }
})