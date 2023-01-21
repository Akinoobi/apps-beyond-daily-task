import create from "zustand";

export const DailyTaskStateManager = create((set) => ({
  title: "",
  length: 0,
  theme: "",
  form: [
    {
      id: Math.floor(Math.random() * 100),
      title: "Design the app",
      length: {
        minutes: 120,
        seconds: 60,
      },
      theme: "bg-yellow-400",
    },
    {
      id: Math.floor(Math.random() * 100),
      title: "Mobile devs sync",
      length: {
        minutes: 30,
        seconds: 60,
      },
      theme: "bg-green-400",
    },
    {
      id: Math.floor(Math.random() * 100),
      title: "Design the app",
      length: {
        minutes: 60,
        seconds: 60,
      },
      theme: "bg-red-400 ",
    },
  ],
  addTask: (payload) =>
    set((state) => ({
      form: [
        {
          id: Math.floor(Math.random() * 100),
          title: payload.title,
          length: {
            minutes: payload.length.minutes,
            seconds: payload.length.seconds
          },
          theme: payload.theme,
        },
        ...state.form,
      ],
    })),
  editTask: (payload) => 
  set((state) => 
   ({
    form: state.form.map((item) => {
      if (item.id !== Number(payload.id)) return item
      return {
        ...item,
        title: payload.title,
        length: {
          minutes: payload.length.minutes,
          seconds: payload.length.seconds
        },
        theme: payload.theme,
      }
    })
  })
  )
}));
