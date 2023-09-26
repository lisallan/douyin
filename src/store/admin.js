import { defineStore } from 'pinia'
import {ref} from 'vue'
export const adminStore = defineStore('admin', () => {
    const adminMessg = ref()
    const flag = ref()

    return { adminMessg }
  })