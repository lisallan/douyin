import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
  state: () => {
      return {
          count: 10
      }
  },
  actions: {
      increment() {
          this.count++
          return new Promise((resolve, reject) => {
              // resolve('asdasdsad')
              reject('错误了兄弟...')
          })
      },
  }
}

)