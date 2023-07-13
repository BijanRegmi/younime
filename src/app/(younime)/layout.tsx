import "@/styles/globals.css"

import { getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"

import SessionContext from "@/components/Context/SessionContext"
import { TrpcProvider } from "@/components/Context/TrpcContext"

import Header from "@/components/Navbar"
import Sidebar from "@/components/Navbar/Sidebar"
import { RecoilContext } from "@/components/Context/RecoilContext"
import { ReactNode } from "react"
import { MainLayout } from "@/components/MainLayout"
import Alert from "@/components/Alert"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Younime",
        template: "%s | Younime",
    },
    description: "Youtube themed anime website",
    keywords: ["Anime", "Youtube"],
    creator: "Bijan Regmi",
    icons: { icon: "/favicon.ico" },
    themeColor: "black",
}

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
                        <RecoilContext>
                            {/* @ts-expect-error Server Component */}
                            <Header session={session} />
                            <div className="flex flex-row h-[calc(100%-5rem)] w-full">
                                <Sidebar />
                                <MainLayout>{children}</MainLayout>
                            </div>
                            <Alert />
                        </RecoilContext>
                    </TrpcProvider>
                </SessionContext>
            </body>
        </html>
    )
}
