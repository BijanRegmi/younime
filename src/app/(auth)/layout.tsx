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
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    )
}
