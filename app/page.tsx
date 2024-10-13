"use client"
import { useRef, useState } from "react"
import { RefreshCwIcon, UploadIcon } from "lucide-react"

export default function LandingPage() {
    const [upload, setUpload] = useState(false)
    const [status, setStatus] = useState("Upload")
    const fileRef = useRef<HTMLInputElement>(null)

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Handle Empty File
        if (!fileRef.current?.files) {
            throw new Error("No file selected")
        }

        setUpload(true)
        setStatus("Uploading...")
        const file = fileRef.current.files[0]

        // Request
        const res = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
        })

        // Handle Error
        if (!res.ok) {
            setUpload(false)
            setStatus("Error")
            return
        }

        // Handle Success
        setUpload(false)
        setStatus("Success!")
        setInterval(() => {
            setStatus("Upload")
        }, 1500)
    }

    

    return (
        <section className='w-screen h-screen p-4 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Photo Upload</h1>
            <form
                className='flex gap-4'
                onSubmit={handleSumbit}
            >
                <button
                    type='button'
                    className='flex gap-2 font-semibold text-lg items-center justify-center bg-gray-800 py-2 px-3 rounded-md capitalize transition-colors hover:bg-gray-700 active:bg-gray-500 w-max'
                >
                    <RefreshCwIcon size={18} /> Refresh
                </button>
                <button
                    type='submit'
                    disabled={upload}
                    className='flex gap-2 font-semibold text-lg items-center justify-center bg-gray-800 py-2 px-3 rounded-md capitalize transition-colors hover:bg-gray-700 active:bg-gray-500 w-max'
                >
                    <UploadIcon size={18} /> {status}
                </button>
                <input
                    type='file'
                    aria-label='Upload'
                    className='text-lg font-semibold bg-gray-800 flex items-center justify-center py-2 px-3 rounded-md'
                    ref={fileRef}
                    required
                />
            </form>
        </section>
    )
}
