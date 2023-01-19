import create from 'zustand'

export const DailyTaskStateManager = create(() => ({
    title: "",
    length: 0,
    theme: "",
  }))