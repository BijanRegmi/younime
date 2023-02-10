"use client"

import { createContext, useState } from "react"
export const GlobalContext = createContext()

const ReactContext = ({ children }) => {
	const [state, setState] = useState({ sidebar: true })

	return (
		<GlobalContext.Provider value={{ state, setState }}>
			{children}
		</GlobalContext.Provider>
	)
}

export default ReactContext
