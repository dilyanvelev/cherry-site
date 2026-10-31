import { computed } from 'vue'

// The harvest an order made today goes to: after July it's next year's picking
export function useHarvestYear() {
  return computed(() => {
    const now = new Date()
    return now.getMonth() > 6 ? now.getFullYear() + 1 : now.getFullYear()
  })
}
