import { put } from '@vercel/blob'

export async function POST(req: Request) {

    // Get Params from request URL
    const { searchParams } = new URL(req.url)
    const filename = searchParams.get('filename')

    // Early Returns for Errros
    if(!filename) {
        return new Response(JSON.stringify('No filename provided'), { status: 400 })
    }
    if(!req.body) {
        return new Response(JSON.stringify('No body provided'), { status: 400 })
    }

    // Upload File
    await put(filename, req.body, { access: 'public' })

    // Return Response
    return new Response(JSON.stringify('File uploaded'), { status: 200 })
}