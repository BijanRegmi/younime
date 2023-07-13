import { atom } from "recoil"

export enum AlertStatus {
    HIDDEN,
    SUCCESS,
    ERROR,
}

export const sidebarAtom = atom({ key: "sidebar", default: true })
export const alertAtom = atom({
    key: "alert",
    default: {
        title: "",
        timer: -1,
        status: AlertStatus.HIDDEN,
    },
})
