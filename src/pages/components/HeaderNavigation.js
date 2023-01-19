import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import Modal from "./Modal";
import { useWindowSize } from "react-use";
import { DailyTaskStateManager } from "../api/DailyTaskStateManager";
import shallow from "zustand/shallow";

const HeaderNavigation = () => {
  const [openModal, setOpenModal] = useState(false);
  const { width } = useWindowSize();
  const [title, length, theme] = DailyTaskStateManager(
    (state) => [
      // state.cardValue,
      state.title,
      state.length,
      state.theme,
    ],
    shallow
  );
  const [dailyTaskState, setDailyTaskState] = useState({
    title: "",
    length: 0,
    theme: "",
  });
  const onSave = () => {
    console.log("values", values);
  };
  console.log("title", title, "length", length, "theme", theme);
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
        title={"Configure Task"}
        headerClass={"text-black mx-auto"}
        subtitle={"You can edit your task here."}
      >
        <div className="flex flex-col w-full h-full max-h-[300px] min-h-[300px] max-w-[500px] min-w-[500px] justify-center items-center gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={dailyTaskState.title}
            className={
              "placeholder-gray-500  text-black  border-2 border-gray-700 rounded-md p-2"
            }
            onChange={(e) => {
              setDailyTaskState({
                ...dailyTaskState,
                title: e.target.value,
              });
            }}
          />
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={dailyTaskState.length}
            className={
              "placeholder-gray-500 border-2 text-black border-gray-700 rounded-md p-2"
            }
            onChange={(e) => {
              setDailyTaskState({
                ...dailyTaskState,
                length: e.target.value,
              });
            }}
          />
          <input
            type="text"
            name="theme"
            placeholder="theme"
            value={dailyTaskState.theme}
            className={
              "placeholder-gray-500 text-black border-2 border-gray-700 rounded-md p-2"
            }
            onChange={(e) => {
              setDailyTaskState({
                ...dailyTaskState,
                theme: e.target.value,
              });
            }}
          />
          <div className="flex flex-row space-x-4">
            <button
              className="bg-transparent text-gray-700 px-5 py-2 rounded-md"
              onClick={(e) => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-gray-700 px-5 py-2 rounded-md"
              htmlType="submit"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="w-full flex  justify-end p-4"
        onClick={() => setOpenModal(true)}
      >
        <BsPlusLg size={30} color="blue" />
      </div>
    </div>
  );
};
export default HeaderNavigation;
