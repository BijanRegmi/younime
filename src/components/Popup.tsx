import { ReactNode } from "react"

export const Popup = ({
    onClickOutside,
    children,
}: {
    onClickOutside: () => void
    children: ReactNode
}) => {
    return (
        <div className="fixed inset-0 z-10">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={onClickOutside}
            />
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="flex mx-auto">
                    <div className="relative mx-auto bg-white rounded-md drop-shadow-3xl max-h-[95vh] overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
