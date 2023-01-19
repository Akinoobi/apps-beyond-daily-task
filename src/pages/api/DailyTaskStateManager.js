import create from "zustand";

export const DailyTaskStateManager = create((set) => ({
  title: "",
  length: 0,
  theme: "",
  form: [
    {
      title: "Design the app",
      length: 120,
      theme: "bg-yellow-400",
    },
    {
      title: "Mobile devs sync",
      length: 30,
      theme: "bg-green-400",
    },
    {
      title: "Design the app",
      length: 60,
      theme: "bg-red-400 ",
    },
  ],
  addTask: (payload) =>
    set((state) => ({
      form: [
        {
          id: Math.floor(Math.random() * 100),
          title: payload.title,
          length: payload.length,
          theme: payload.theme,
        },
        ...state.form
      ],
    })),
}));
