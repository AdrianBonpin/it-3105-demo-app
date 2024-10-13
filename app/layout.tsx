import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Photo Upload and View",
    description: "A simple image uploader and viewer using Vercel Blob",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang='en'
            className='antialiased overflow-x-clip scroll-smooth bg-black text-white'
        >
            <body>{children}</body>
        </html>
    )
}
