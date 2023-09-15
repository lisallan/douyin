import { defineStore } from 'pinia'

export const useOtherStore = defineStore('other', {
    state: () => ({ num: 5 }),
    getters: {
        double: state => state.num * 2,
    }
})