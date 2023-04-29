"use client"

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react"

interface ContextState {
    sidebar: boolean
}

interface ContextData {
    state: ContextState
    setState: Dispatch<SetStateAction<ContextState>>
}

export const GlobalContext = createContext({} as ContextData)

const ReactContext = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState({ sidebar: true } as ContextState)

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ReactContext
