"use client"
import { useState } from "react"
import { MdOutlineFeedback } from "react-icons/md"
import { useRecoilState } from "recoil"
import { alertAtom, AlertStatus } from "../Context/state"
import { Popup } from "../Popup"
import { Report } from "../Report"

export const Feedback = () => {
    const [open, setOpen] = useState(false)
    const openPopup = () => setOpen(true)
    const closePopup = () => setOpen(false)

    const [_alert, setAlert] = useRecoilState(alertAtom)

    const onSuccess = () => {
        setOpen(false)
        const timer = 4000
        setAlert({
            title: "Thank you for your feedback",
            timer,
            status: AlertStatus.SUCCESS,
        })
        setTimeout(() => {
            setAlert({ title: "", timer: -1, status: AlertStatus.HIDDEN })
        }, timer)
    }

    return (
        <>
            <div
                className="flex-shrink-0 items-center border border-solid border-white rounded-[1.3rem] p-[0.1rem/0.8rem] cursor-pointer text-white decoration-solid no-underline hover:bg-[#333] h-full flex justify-center gap-2"
                onClick={openPopup}
            >
                <MdOutlineFeedback className="h-4/5 fill-white" />
                <span>Feedback</span>
            </div>
            {open && (
                <Popup onClickOutside={closePopup}>
                    <Report
                        kind="NONE"
                        onSuccess={onSuccess}
                        onCancel={closePopup}
                        refId="0"
                    />
                </Popup>
            )}
        </>
    )
}
