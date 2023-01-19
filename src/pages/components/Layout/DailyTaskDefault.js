import DailyTaskList from "../DailyTaskList"
import HeaderNavigation from "../HeaderNavigation"

const DailyTaskDefault = () => {


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="w-1/2 mt-20">
                <HeaderNavigation />
                <DailyTaskList/>
            </div>

        </div>
    )
}

export default DailyTaskDefault