import Alert from "@/components/Alert"
import { RecoilContext } from "@/components/Context/RecoilContext"
import { TrpcProvider } from "@/components/Context/TrpcContext"
import "@/styles/globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <RecoilContext>
                    <TrpcProvider>{children}</TrpcProvider>
                    <Alert />
                </RecoilContext>
            </body>
        </html>
    )
}
