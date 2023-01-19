import { useState } from "react";
import { AiOutlineRight, AiOutlineClockCircle } from "react-icons/ai";

const DailyTaskList = () => {
    const [openModal, setOpenModal] = useState(false)

    const data = [
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
        }
    ]
    return (
        <>
            <h1 className="text-center text-[50px] mb-10 font-bold text-gray-800">Daily Tasks</h1>
            <div className="flex flex-col mx-auto min-h-[105vh] items-center">
                {data.length > 0 ? (
                    data.map((item, index) => {
                        return (
                            <div key={index} className={`flex flex-row ${item.theme} mb-6 w-3/4 p-4 rounded-md justify-between border-2 border-gray-300`}>
                                <p className="1/2 ">{item.title}</p>
                                <div className="1/4 flex flex-row items-center justify-end gap-2">{item.length} <span ><AiOutlineClockCircle /></span></div>
                                <span className="1/4"><AiOutlineRight size={20} title={"Want to start the timer?"} /></span>
                            </div>
                        )
                    })
                ) : null}
            </div>
        </>
    )
}

export default DailyTaskList