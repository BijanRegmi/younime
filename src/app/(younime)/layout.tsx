import "@/styles/globals.css"

import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

import SessionContext from "@/components/Context/SessionContext"
import { TrpcProvider } from "@/components/Context/TrpcContext"

import Header from "@/components/Navbar"
import Sidebar from "@/components/Navbar/Sidebar"
import ReactContext from "@/components/Context/ReactContext"
import { ReactNode } from "react"

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <html>
            <head></head>
            <body>
                <SessionContext session={session}>
                    <TrpcProvider>
                        <ReactContext>
                            {/* @ts-expect-error Server Component */}
                            <Header session={session} />
                            <div className="p-2 flex flex-row gap-2 h-[calc(100%-4rem)] w-full">
                                <Sidebar />
                                <div
                                    style={{
                                        width: "calc(100% - var(--sidebarwidth))",
                                    }}
                                    className="h-full max-h-full flex-grow flex-shrink"
                                >
                                    {children}
                                </div>
                            </div>
                        </ReactContext>
                    </TrpcProvider>
                </SessionContext>
            </body>
        </html>
    )
}
