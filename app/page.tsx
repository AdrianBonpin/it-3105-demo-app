"use client"
import { useEffect, useRef, useState } from "react"
import { RefreshCwIcon, UploadIcon } from "lucide-react"
import { ListBlobResult } from "@vercel/blob"
import Image from "next/image"

export default function LandingPage() {
    const [upload, setUpload] = useState(false)
    const [status, setStatus] = useState("Upload")
    const fileRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<ListBlobResult | null>(null)

    // Upload an Image
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
            const reply = await res.json()
            console.log(reply)
            return
        }

        // Handle Success
        setUpload(false)
        setStatus("Success!")
        setInterval(() => {
            setStatus("Upload")
            getImages()
        }, 1500)
    }

    // Delete an Image
    const handleDelete = async (url: string) => {
        const res = await fetch("/api/delete", {
            method: "DELETE",
            body: JSON.stringify(url),
        })
        if (!res.ok) {
            alert("Something went wrong")
            return
        }
        getImages()
    }

    // Get Images
    const getImages = async () => {
        const res = await fetch("/api/get", { method: "GET" })
        if (!res.ok) {
            alert("Something went wrong")
            return
        }
        const reply = await res.json()
        setImages(reply)
    }

    // Fetch on Load
    useEffect(() => {
        getImages()
    }, [])

    return (
        <section className='w-screen h-screen p-4 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Photo Upload</h1>
            <button
                type='button'
                className='flex gap-2 font-semibold text-lg items-center justify-center bg-gray-800 py-2 px-3 rounded-md capitalize transition-colors hover:bg-gray-700 active:bg-gray-500 w-max'
                onClick={getImages}
            >
                <RefreshCwIcon size={18} /> Refresh
            </button>
            <form
                className='flex gap-4'
                onSubmit={handleSumbit}
            >
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
            {images &&
                images.blobs.map((blob) => (
                    <div
                        key={blob.pathname}
                        className='p-4 bg-gray-800 w-max rounded-md cursor-pointer hover:bg-gray-700 transition-colors'
                        onClick={() => handleDelete(blob.url)}
                    >
                        <Image
                            priority
                            src={blob.url}
                            alt='Image'
                            width={300}
                            height={300}
                        />
                    </div>
                ))}
        </section>
    )
}
