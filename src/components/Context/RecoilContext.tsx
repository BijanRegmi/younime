"use client"

import { ReactNode } from "react"
import { RecoilRoot } from "recoil"

export const RecoilContext = (props: { children: ReactNode }) => {
    return <RecoilRoot>{props.children}</RecoilRoot>
}
