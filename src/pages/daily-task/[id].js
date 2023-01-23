import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { DailyTaskStateManager } from "../api/DailyTaskStateManager";
import { AiFillEdit, AiOutlinePauseCircle } from "react-icons/ai";
import Modal from "../components/Modal";
import { useWindowSize } from "react-use";
import { BiArrowBack } from "react-icons/bi";
import {
  BsHourglassBottom,
  BsHourglassTop,
  BsPlayCircle,
  BsStopCircle,
} from "react-icons/bs";
import InputColor from "react-input-color";
export default function DailyTaskEditPage({}) {
  const router = useRouter();
  const { id } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [isTimerPlayed, setIsTimerPlayed] = useState({
    play: false,
    recentlyClicked: "",
  });
  const { width } = useWindowSize();
  const [form, editTask] = DailyTaskStateManager(
    (state) => [state.form, state.editTask],
    shallow
  );
  const data = form && form.find((item) => item.id === Number(id));
  const [editDailyTask, setEditDailyTask] = useState({
    id: id,
    title: (data && data.title) || "test",
    length: (data && data.length) || "test",
    theme: (data && data.theme) || "test",
  });
  const onSaveEdit = () => {
    editTask(editDailyTask);
    setOpenModal(false);
  };
  const startTimer = (status) => {
    setIsTimerPlayed({
      ...isTimerPlayed,
      recentlyClicked: status
    })
    if (["resume", "playNow"].includes(status)) {
      let minutes = editDailyTask.length.minutes;
      let seconds = editDailyTask.length.seconds;
      let minutesElapsed = editDailyTask.length.minutesElapsed;
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          seconds = Number(seconds - 1);
          setEditDailyTask((prev) => {
            let item = prev;
            item.id = Number(id);
            item.length.seconds = seconds;

            return item;
          });
          editTask(editDailyTask);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            // setEditDailyTask({
            //   ...editDailyTask.length,
            //   id: Number(editDailyTask.id),
            //   length: {
            //     minutes: Number(editDailyTask.length.minutes - 1),
            //     seconds: 59,
            //   },
            // });
            minutes = Number(minutes - 1);
            seconds = 59;
            minutesElapsed = Number(minutesElapsed + 1);
            setEditDailyTask((prev) => {
              let item = prev;
              item.id = Number(id);
              (item.length.minutes = minutes),
                (item.length.seconds = seconds),
                (item.length.minutesElapsed = minutesElapsed);

              return item;
            });
            editTask(editDailyTask);
          }
        }
        console.log("test", editDailyTask, "form", form);
      }, 1000);
    }
    return () => {
      clearInterval(myInterval);
    };
  };
  console.log("isTimerPlayed", isTimerPlayed);
  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        closablex
        contentClass={`rounded-lg`}
        width={width}
        title={"Configure Task"}
        headerClass={"text-black mx-auto"}
        subtitle={"You can edit your task here."}
      >
        <div className="flex flex-col w-full h-full max-h-[300px] min-h-[300px] max-w-[500px] min-w-[500px] justify-center items-center gap-4 ">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editDailyTask.title}
            className={
              "placeholder-gray-500  text-black  border-2 border-gray-700 rounded-md p-2 w-2/3"
            }
            onChange={(e) => {
              setEditDailyTask({
                ...editDailyTask,
                title: e.target.value,
              });
            }}
          />
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={editDailyTask.length.minutes}
            className={
              "placeholder-gray-500 border-2 text-black border-gray-700 rounded-md p-2 w-2/3"
            }
            onChange={(e) => {
              setEditDailyTask({
                ...editDailyTask,
                length: {
                  minutes: e.target.value,
                  seconds: editDailyTask.length.seconds,
                },
              });
            }}
          />
            <div className="flex flex-row items-center transition-all border-2 border-gray-700 rounded-md p-2 w-2/3">
            <input
              type="text"
              name="theme"
              placeholder="theme"
              value={editDailyTask?.theme}
              className={
                "appearance-none placeholder-gray-500 border-none bg-transparent text-black "
              }
            />
            <InputColor
              initialValue="#5e72e4"
              onChange={(e) => {
                setEditDailyTask({
                  ...editDailyTask,
                  theme:  e.rgba,
                });
              }}
              className="transition"
              placement="bottom"
            />
          </div>
          <div className="flex flex-row space-x-4">
            <button
              className="bg-transparent text-gray-700 px-5 py-2 rounded-md"
              onClick={(e) => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-gray-700 px-5 py-2 rounded-md"
              onClick={onSaveEdit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-1/2 mt-20">
          <div
            className="w-full flex flex-row justify-between p-4"
            onClick={() => {}}
          >
            <BiArrowBack
              size={30}
              color="blue"
              title="Go back to Daily Task List"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            />
            <AiFillEdit
              size={30}
              color="blue"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>
          <div className={`flex justify-center`}>
            <div
              className={`mt-10 p-6 max-h-[500px] min-h-[500px] max-w-[350px] min-w-[350px] rounded-lg`}
              style={{
                background: `${data?.theme}`
              }}
            >
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-[13px]">Minutes Elapsed </p>
                  <div className="flex items-center flex-row">
                    <BsHourglassBottom
                      size={20}
                      color="black"
                      // onClick={() => {
                      //   setOpenModal(true);
                      // }}
                    />
                    <p className="text-[13px]">
                      {editDailyTask.length.minutesElapsed}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[13px]">Minutes Remaining </p>
                  <div className="flex items-center justify-end flex-row">
                    <BsHourglassTop
                      size={20}
                      color="black"
                      // onClick={() => {
                      //   setOpenModal(true);
                      // }}
                    />
                    <p className="text-[13px]">
                      {editDailyTask.length.minutes}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-5/6 ">
                <div className="flex flex-col my-auto items-center ">
                  <p className="text-[40px] font-bold">{data?.title}</p>
                  <div className="text-[40px] font-medium flex flex-row  justify-between w-1/2">
                    <p>{`${editDailyTask?.length.minutes}`}</p>
                    <p className="-mt-1">{" : "}</p>
                    <p>{`${editDailyTask?.length.seconds}`}</p>
                  </div>
                  <div className="pl-1 -mt-3 flex flex-row items-center justify-between w-1/2">
                    <p className="font-medium text-[15px]">Minutes</p>
                    <p className="font-medium text-[15px]">Seconds</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4 justify-center">
                  <BsStopCircle
                    size={40}
                    className={"cursor-pointer text-red-800"}
                    // color="blue"
                    onClick={() => {
                      setIsTimerPlayed({
                        ...isTimerPlayed,
                        play: false,
                        recentlyClicked: "pause",
                      });
                      startTimer("pause");
                    }}
                  />
                  <BsPlayCircle
                    size={80}
                    className={"cursor-pointer"}
                    color="blue"
                    onClick={() => {
                      setIsTimerPlayed({
                        ...isTimerPlayed,
                        play: true,
                        recentlyClicked: "playNow",
                      });
                      startTimer("playNow");
                    }}
                  />
                  <AiOutlinePauseCircle
                    size={40}
                    className={"cursor-pointer text-gray-400"}
                    // color="blue"
                    onClick={() => {
                      setIsTimerPlayed({
                        ...isTimerPlayed,
                        play: true,
                        recentlyClicked: "resume",
                      });
                      startTimer("resume");
                    }}
                  />
                </div>
              </div>

              {/* <p>{data?.theme}</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
