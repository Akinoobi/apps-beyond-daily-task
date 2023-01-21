import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineRight, AiOutlineClockCircle } from "react-icons/ai";
import { shallow } from "zustand/shallow";
import { DailyTaskStateManager } from "../api/DailyTaskStateManager";

const DailyTaskList = () => {
  const router = useRouter();
  const [form] = DailyTaskStateManager((state) => [state.form], shallow);
  console.log("form in list", form);
  return (
    <>
      <h1 className="text-center text-[50px] mb-10 font-bold text-gray-800">
        Daily Tasks
      </h1>
      <div className="flex flex-col mx-auto min-h-[105vh] items-center">
        {form.length > 0
          ? form.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-row ${item.theme} mb-6 w-3/4 p-4 rounded-md justify-between border-2 border-red-200`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`/daily-task/${item.id}`)}
                  }
                >
                  <p className="w-1/2 ">{item.title}</p>
                  <div className="w-1/4 flex flex-row items-center justify-end gap-2">
                    {item.length.minutes}
                    <span>
                      <AiOutlineClockCircle />
                    </span>
                  </div>

                  <span className="w-1/4  flex justify-end">
                    <AiOutlineRight
                      size={20}
                      title={"Want to start the timer?"}
                    />
                  </span>
                </div>
              );
            })
          : "null"}
      </div>
    </>
  );
};

export default DailyTaskList;
