"use client"
import { ChangeEvent, useState } from "react"
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineQuestionCircle,
    AiOutlineSync,
} from "react-icons/ai"
import { BsFiletypeXml } from "react-icons/bs"
import { CiImport } from "react-icons/ci"
import { useRecoilState } from "recoil"
import { alertAtom, AlertStatus } from "../Context/state"
import { trpc } from "../Context/TrpcContext"
import { Popup } from "../Popup"

export const MalSync = () => {
    const [popup, setPopup] = useState(false)

    const openPopup = () => setPopup(true)
    const closePopup = () => setPopup(false)

    const [xmlData, setXmlData] = useState("")
    const [file, setFile] = useState("")
    const [_alert, setAlert] = useRecoilState(alertAtom)

    const fileChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        setFile(file.name)
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = (reader.result as string)
                .replace("data:", "")
                .replace(/^.+,/, "")
            setXmlData(base64String)
        }
        reader.readAsDataURL(file)
    }

    const { mutate, isLoading } = trpc.playlist.sync.useMutation({
        onSuccess: () => {
            setXmlData("success")
            setPopup(false)

            const timer = 2000
            setAlert({
                title: "Imported history successfully",
                timer,
                status: AlertStatus.SUCCESS,
            })
            setTimeout(() => {
                setAlert({ title: "", timer: -1, status: AlertStatus.HIDDEN })
            }, timer)
        },
    })
    const submit = () => mutate({ data: xmlData })

    return (
        <>
            <button
                className="bg-white rounded-md border border-solid border-gray-500 shadow-sm whitespace-nowrap px-4 py-2 flex gap-2 w-full text-black items-center"
                onClick={openPopup}
            >
                <CiImport className="w-6 h-6 text-black" />
                <span className="align-middle text-base text-black">
                    Import Mal
                </span>
            </button>
            {popup && (
                <Popup onClickOutside={closePopup}>
                    <div className="text-black px-8 py-4 text-center">
                        <h1 className="text-lg">
                            Sync watch history from{" "}
                            <a
                                href="https://myanimelist.net/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                MyAnimeList
                            </a>
                        </h1>
                        <h2 className="text-sm">
                            <AiOutlineQuestionCircle className="inline-block mr-2" />
                            <span className="inline-block">
                                Export anime list from{" "}
                                <a
                                    className="underline"
                                    href="https://myanimelist.net/panel.php?go=export"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    here
                                </a>{" "}
                                then extract the xml file
                            </span>
                        </h2>
                        <label
                            htmlFor="xmlpicker"
                            className="flex flex-col items-center justify-around py-2 gap-2"
                        >
                            <input
                                id="xmlpicker"
                                type="file"
                                accept="text/xml"
                                onChange={fileChanged}
                                className="hidden"
                            />
                            {file ? (
                                <BsFiletypeXml className="text-8xl" />
                            ) : (
                                <CiImport className="text-8xl" />
                            )}
                            <span>{file || "Pick a XML file"}</span>
                        </label>
                        <div className="flex flex-row justify-end gap-2">
                            <button
                                className="px-2 py-1 flex flex-row gap-2 items-center border border-accent-50 rounded-md"
                                onClick={submit}
                                disabled={xmlData == "success" || xmlData == ""}
                            >
                                {xmlData === "success" ? (
                                    <AiOutlineCheckCircle className="text-base" />
                                ) : (
                                    <AiOutlineSync
                                        className={`text-base ${
                                            isLoading ? "animate-spin" : ""
                                        }`}
                                    />
                                )}
                                <span>
                                    {xmlData == "success" ? "Done" : "Sync"}
                                </span>
                            </button>
                            <button
                                className="px-2 py-1 flex flex-row gap-2 items-center border border-accent-50 rounded-md"
                                onClick={closePopup}
                            >
                                <AiOutlineCloseCircle className="text-base" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    )
}
