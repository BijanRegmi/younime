"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"
import type { AppRouter } from "@/server/routers/_app"

export const trpc = createTRPCReact<AppRouter>()

function getBaseUrl() {
    if (typeof window !== "undefined") return ""

    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

    if (process.env.RENDER_INTERNAL_HOSTNAME)
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

    return `http://localhost:${process.env.PORT ?? 3000}`
}

export function TrpcProvider(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
        })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
