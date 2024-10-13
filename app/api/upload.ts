import { NextResponse } from "next/server"
import { put } from '@vercel/blob'

export async function POST(req: Request): Promise<NextResponse> {

    // Get Params from request URL
    const { searchParams } = new URL(req.url)
    const filename = searchParams.get('filename')

    // Early Returns for Errros
    if(!filename) {
        return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }
    if(!req.body) {
        return NextResponse.json({ error: 'No body provided' }, { status: 400 })
    }

    // Upload File
    const blob = await put(filename, req.body, { access: 'public' })

    // Return Response
    return NextResponse.json({ blob }, { status: 200 })
}