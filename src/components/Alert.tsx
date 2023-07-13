"use client"

import { AiOutlineClose } from "react-icons/ai"
import { useRecoilState } from "recoil"
import { alertAtom, AlertStatus } from "./Context/state"

const Alert = () => {
    const [alert, setAlert] = useRecoilState(alertAtom)

    if (alert.status === AlertStatus.HIDDEN) return <></>

    const closeAlert = () =>
        setAlert({ status: AlertStatus.HIDDEN, title: "", timer: -1 })

    return (
        <div
            className={`fixed bottom-4 right-4 bg-accent-100 py-2 overflow-x-hidden border-2 ${
                alert.status === AlertStatus.ERROR
                    ? "border-red-700"
                    : "border-green-700"
            } cursor-pointer group rounded-t-md border-b-0`}
            onClick={closeAlert}
        >
            <span className="px-4">{alert.title}</span>
            <div
                className={`w-full bottom-0 border-b-2 absolute ${
                    alert.status === AlertStatus.ERROR
                        ? "border-b-red-700"
                        : "border-b-green-700"
                }`}
                style={{
                    animationName: alert.timer > 0 ? "progressBar" : "",
                    animationDuration: `${alert.timer}ms`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                }}
            />
            <AiOutlineClose className="mr-4 cursor-pointer hidden group-hover:inline-block" />
        </div>
    )
}

export default Alert
