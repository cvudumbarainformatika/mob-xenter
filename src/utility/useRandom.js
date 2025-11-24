import { reactive } from 'vue'

export default function useRandom (data) {
  const state = reactive({
    startDate: new Date(1992, 9, 11),
    oneDay: 24 * 3600 * 1000,
    value: Math.random() * 100
  })

  const randomData = () => {
    state.startDate = new Date(state.startDate.valueOf() + state.oneDay)
    state.value = state.value + Math.random() * 21 - 10

    return {
      name: state.startDate.toString(),
      value: [`${state.startDate.getFullYear()}/${state.startDate.getMonth() + 1}/${state.startDate.getDate()}`, Math.round(state.value)]
    }
  }

  const initialData = () => {
    for (let i = 0; i < 1000; i++) {
      data.value.push(randomData())
    }
  }

  return { initialData, randomData }
}
