import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import Modal from "./Modal";
import { useWindowSize } from "react-use";
import { DailyTaskStateManager } from "../api/DailyTaskStateManager";
import shallow from "zustand/shallow";
import Select from "react-select";
import InputColor from "react-input-color";

const HeaderNavigation = () => {
  const [openModal, setOpenModal] = useState(false);
  const { width } = useWindowSize();
  const [addTask] = DailyTaskStateManager(
    (state) => [
      // state.cardValue,

      state.addTask,
    ],
    shallow
  );
  const [error, setError] = useState([]);

  const [dailyTaskState, setDailyTaskState] = useState({
    title: "",
    length: {
      minutes: null,
      seconds: 60,
    },
    theme: "",
  });
  const onSave = () => {
    if (!dailyTaskState.title) {
      setError((prev) => {
        let temp = [...prev];
        if (
          prev?.find(
            (item) => item.errorName !== "title" && temp.length === 1
          ) ||
          !temp.length
        ) {
          temp.push({
            errorName: "title",
            message: `Please input title length equivalent to requirement (15).`,
          });
        }
        return temp;
      });
    }
    if (!dailyTaskState.length.minutes || dailyTaskState.length.minutes === 0) {
      setError((prev) => {
        let temp = [...prev];
        if (
          prev?.find(
            (item) => item.errorName !== "length" && temp.length === 1
          ) ||
          !temp.length
        ) {
          temp.push({
            errorName: "length",
            message: `Please input length that more than 0.`,
          });
        }
        return temp;
      });
      return;
    }

    addTask(dailyTaskState);
    setOpenModal(false);
  };
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  return (
    <div
      role="navigation"
      className={`transition-all sticky top-0 z-50 bg-transparent text-white
        }`}
    >
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        closablex
        contentClass={`rounded-lg`}
        width={width}
        title={"Add Task"}
        headerClass={"text-black mx-auto"}
        subtitle={"Add your task here to monitor your works."}
      >
        <div className="flex flex-col w-full h-full max-h-[300px] min-h-[300px] max-w-[500px] min-w-[500px] justify-center items-center gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={dailyTaskState?.title}
            className={
              "placeholder-gray-500  text-black  border-2 border-gray-700 rounded-md p-2 w-2/3"
            }
            onChange={(e) => {
              setDailyTaskState({
                ...dailyTaskState,
                title: e.target.value,
              });
              if (e.target.value.length > 14 || !e.target.value) {
                setError((prev) => {
                  let temp = [...prev];
                  if (
                    prev?.find(
                      (item) => item.errorName !== "title" && temp.length === 1
                    ) ||
                    !temp.length
                  ) {
                    temp.push({
                      errorName: "title",
                      message: `Please input title length equivalent to requirement (15).`,
                    });
                  }
                  return temp;
                });
              }
            }}
          />
          {error.find((item) => item.errorName === "title") && (
            <p className="mt-1 text-xs text-red-500">
              {error.find((item) => item.errorName === "title").message}
            </p>
          )}
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={dailyTaskState?.length.minutes}
            className={
              "placeholder-gray-500 border-2 text-black border-gray-700 rounded-md p-2 w-2/3"
            }
            onChange={(e) => {
              setDailyTaskState({
                ...dailyTaskState,
                length: {
                  minutes: Number(e.target.value),
                  seconds: 0,
                },
              });
            }}
          />
          {error.find((item) => item.errorName === "length") && (
            <p className="mt-1 text-xs text-red-500">
              {error.find((item) => item.errorName === "length").message}
            </p>
          )}
          <div className="flex flex-row justify-between transition-all border-2 border-gray-700 rounded-md p-2  w-2/3">
            <input
              type="text"
              name="theme"
              placeholder="theme"
              className={
                "appearance-none placeholder-gray-500 border-none bg-transparent text-black "
              }
            />
            <InputColor
              initialValue="#5e72e4"
              onChange={(e) => {
                setDailyTaskState({
                  ...dailyTaskState,
                  theme: e.rgba,
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
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div className="w-full flex  justify-end p-4" onClick={() => {}}>
        <BsPlusLg
          size={30}
          color="blue"
          onClick={() => {
            setDailyTaskState({
              title: "",
              length: {
                minutes: null,
                seconds: 60,
              },
              theme: "",
            });
            setOpenModal(true);
          }}
        />
      </div>
    </div>
  );
};
export default HeaderNavigation;
