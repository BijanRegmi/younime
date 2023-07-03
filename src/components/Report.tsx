import React, { ChangeEvent, FormEvent, useState } from "react"
import { ReportItem } from "@prisma/client"
import { trpc } from "./Context/TrpcContext"

const options = {
    EPISODE: [
        "Video not loading properly",
        "Missing video sources",
        "Wrong video",
        "No subtitles",
    ],
    ANIME: ["Missing episodes", "Not up-to-date", "Duplicate"],
    COMMENT: [
        "Smells like spoiler",
        "Offensive",
        "Spam or self-promotion",
        "Irrevelant",
    ],
    USER: [
        "Harasment or bullying",
        "Spamming",
        "Inappropriate behaviour or content",
    ],
    NONE: [
        "I love this site, it's my go-to for anime!",
        "Great selection of anime to choose from!",
        "Easy to use and navigate!",
        "Appreciate the clean and organized layout!",
    ],
}

const ReportOption = ({
    opt,
    onChange,
}: {
    opt: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <label className="inline-flex items-center">
            <input
                type="radio"
                className="h-5 w-5 text-indigo-600"
                name="reason"
                value={opt}
                onChange={onChange}
            />
            <span className="ml-2 text-gray-700">{opt}</span>
        </label>
    )
}

export const Report = ({
    kind,
    refId,
    onSuccess,
    onCancel,
}: {
    onSuccess: () => void
    onCancel: () => void
    kind: ReportItem
    refId: string
}) => {
    const [reason, setReason] = useState("")
    const [details, setDetails] = useState("")

    const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReason(event.target.value)
    }

    const handleDetailsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(event.target.value)
    }

    const { mutate } = trpc.reporting.report.useMutation({ onSuccess })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const msg = reason === "Other" ? details : reason
        mutate({ kind, refId, msg })
    }

    return (
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
            <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                            <span className="text-lg leading-6 text-gray-900 font-bold">
                                Reporting {kind.toLowerCase()}
                            </span>
                            <span className="block font-medium text-gray-700 mb-2">
                                Select a reason.
                            </span>
                            <div className="mt-2 flex flex-col gap-2">
                                {options[kind].map((opt, idx) => (
                                    <ReportOption
                                        key={idx}
                                        opt={opt}
                                        onChange={handleReasonChange}
                                    />
                                ))}
                                <ReportOption
                                    opt="Other"
                                    onChange={handleReasonChange}
                                />
                                {reason == "Other" && (
                                    <textarea
                                        required
                                        className="mt-1 block w-full rounded-md shadow-sm focus:outline-none text-black px-2 border border-solid border-accent-50"
                                        rows={3}
                                        placeholder="Please explain your message"
                                        value={details}
                                        onChange={handleDetailsChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 flex justify-end items-end gap-4">
                    <button
                        type="submit"
                        className="rounded-sm shadow-sm px-2 py-1 bg-accent-150 font-medium text-accent-850 hover:bg-accent-200 focus:outline-none"
                    >
                        Report
                    </button>

                    <button
                        type="button"
                        className="rounded-sm shadow-sm px-2 py-1 bg-accent-150 font-medium text-accent-850 hover:bg-accent-200 focus:outline-none"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
